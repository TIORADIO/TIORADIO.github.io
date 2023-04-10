---
title: Lista de archivos y carpetas
---

{% for file in site.static_files %}
{% if file.path contains '' %}
* [{{ file.path | remove_first: '' }}]({{ file.path | url_escape }})
{% endif %}
{% endfor %}
