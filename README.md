Howto Studs
===========

Development
==========

Deployment
==========
Before: git remote add dokku dokku@studieresan.se:studs2017

**Backend**: git subtree push --prefix backend dokku master

API
===
- permissions: ['admin', 'user_edit']
note: admin permission gives all permissions.
