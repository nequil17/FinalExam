# IAMBHAM FINAL PROJECT INSTRUCTIONS

## INSTALL
- Run `npm install`
- To run project `npm start`
- To generate documentation run `npm run generate-docs`
- The documentation is available at `http://localhost:3000/docs`, which will tell you how to interact with the api

### OBJECTIVES
- Set up an angular project
- Pages needed: list, single

#### List
- The list page will have a select box of directors and two input boxes (one for running time and one for release date)
- If the user selects no filters all movies will be returned from the api and printed on the page
- If the user does select filers the appropriate movies will be returned and printed on the page
- The list page should display movie name and poster

#### Single
- The single page will print out the information for a single movie
- The single page should display all movie information (except for the poster)
- The trailer should be displayed in an iframe

#### Hints
- You will need to inject `$sce` into your single controller in order to allow the youtube link to play within the iframe (e.g. `$sce.trustAsResourceUrl(data.trailer)` this returns a wrapped url that you will need to use for the iframe's `ng-src`)
- You will need to look up how to have a responsive youtube iframe

#### Extra Credit
- Implement the filtering using the query parameters outlined in the documnetation