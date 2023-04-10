---
title: Lista de archivos y carpetas
---

{% for file in site.static_files %}
{% if file.path contains '/noticias/' %}
* [{{ file.path | remove_first: '/noticias/' }}]({{ file.path | url_escape }})
{% endif %}
{% endfor %}
