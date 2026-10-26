"""Flatten .dc.html artboards into a static multi-page site for sharing."""
import re, os, sys, json

ROOT = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.join(ROOT, 'project')
JS = os.path.join(ROOT, 'site-js')
OUT = os.path.join(os.path.dirname(ROOT), 'site')
os.makedirs(OUT, exist_ok=True)

PAGES = {  # dc file -> (site file, js file or None)
    'Main.dc.html': ('index.html', 'home.js'),
    'Pricing.dc.html': ('pricing.html', 'pricing.js'),
    'Docs.dc.html': ('docs.html', None),
    'Signup.dc.html': ('signup.html', 'signup.js'),
    'Terms.dc.html': ('terms.html', None),
    'Privacy.dc.html': ('privacy.html', None),
    'Security.dc.html': ('security.html', None),
}

def defaults_from_script(src):
    """Pull simple `key: 'value'` / `key: "value"` / key: number pairs out of renderVals as hole defaults."""
    m = re.search(r'renderVals\(\)\s*\{(.*?)\n\s*\}\s*\n', src, re.S)
    d = {}
    if not m:
        return d
    body = m.group(1)
    for k, v in re.findall(r"(\w+)\s*:\s*'([^']*)'", body): d[k] = v
    for k, v in re.findall(r'(\w+)\s*:\s*"([^"]*)"', body): d.setdefault(k, v)
    for k, v in re.findall(r'(\w+)\s*:\s*(-?\d+(?:\.\d+)?)\b', body): d.setdefault(k, v)
    return d

def flatten(name):
    src = open(os.path.join(PROJ, name)).read()
    site_file, js_file = PAGES[name]
    defaults = defaults_from_script(src)
    src = src.replace('<script src="./support.js"></script>',
                      '<meta name="viewport" content="width=device-width, initial-scale=1">')
    src = re.sub(r'<script type="text/x-dc".*?</script>\s*', '', src, flags=re.S)
    for t in ['<x-dc>', '</x-dc>', '<helmet>', '</helmet>']:
        src = src.replace(t, '')
    # <sc-if>: keep content (both branches present; JS hides via hidden attr)
    src = re.sub(r'<sc-if\b[^>]*>', '', src)
    src = src.replace('</sc-if>', '')
    # event attrs with holes -> drop
    src = re.sub(r'\s(on\w+)="\{\{[^}]*\}\}"', '', src)
    # remaining holes -> defaults
    unresolved = set()
    def rep(m):
        key = m.group(1).strip()
        if key in defaults: return defaults[key]
        unresolved.add(key); return ''
    src = re.sub(r'\{\{\s*([\w.$]+)\s*\}\}', rep, src)
    # cross-page links
    for dc, (sf, _) in PAGES.items():
        src = src.replace(f'href="{dc}', f'href="{sf}')
        src = src.replace(f"href='{dc}", f"href='{sf}")
    if js_file and os.path.exists(os.path.join(JS, js_file)):
        js = open(os.path.join(JS, js_file)).read()
        src = src.replace('</body>', f'<script>\n{js}\n</script>\n</body>')
    open(os.path.join(OUT, site_file), 'w').write(src)
    print(f'{name} -> {site_file}  unresolved holes: {sorted(unresolved) or "none"}')

for n in PAGES:
    if os.path.exists(os.path.join(PROJ, n)):
        flatten(n)
    else:
        print('missing', n)
