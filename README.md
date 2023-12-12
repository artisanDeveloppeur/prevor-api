# Prevor Test développement

    II. TEST DE DEVELOPPEMENT.

    4) Pour un projet interne, nous avons besoin d’intégrer sur un de nos sites l’emplacement des défibrillateurs de la ville de Liège. Les données sont disponibles sur la page «  Les défibrillateurs — Open Data Liège (liege.be) » et ne doivent pas être présentées sur une carte :

        a. Trouvez le moyen le plus efficient de récupérer ces données afin de les utiliser.
        b. Expliquez vos choix techniques et comment les implémenter.

    5) Réalisez une page web simple mettant en œuvre les points de la question 4.

----------------------------------------------------------------------------------

Documentation code file (scripts/api.js)

(data = https://opendata.liege.be/api/explore/v2.1/catalog/datasets/defibrillateurs/records?limit=40)

1. GET request using fetch(data)  
2. converting received data to JSON
3. Create a variable to store HTML table headers
4. Loop through each data and add a table row
5. DOM Display result

A) **add map and cards with search** 
----------------------------------------------------------------------------------
B) **change table with AGGRID** (https://www.ag-grid.com/javascript-data-grid/getting-started/) 
----------------------------------------------------------------------------------
