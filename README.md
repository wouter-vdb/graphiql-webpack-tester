# graphiql-webpack-tester

This minimal project is meant to reproduce [issue #128](https://github.com/graphql/graphql-language-service/issues/128) for the [graphql-language-service](https://github.com/graphql/graphql-language-service) project.

## Instructions

Install the dependencies and run webpack:

```bash
$ npm install
$ npm run pack
```

The following warnings should be logged:

```
WARNING in ./node_modules/graphql-language-service-interface/dist/GraphQLLanguageService.js.flow
Module parse failed: /Users/iminds/Dev/graphql-language-service-webpack-issue/node_modules/graphql-language-service-interface/dist/GraphQLLanguageService.js.flow Unexpected token (11:12)
You may need an appropriate loader to handle this file type.
|  */
| 
| import type {
|   DocumentNode,
|   FragmentSpreadNode,

WARNING in ./node_modules/graphql-language-service-interface/dist/getAutocompleteSuggestions.js.flow
Module parse failed: /Users/iminds/Dev/graphql-language-service-webpack-issue/node_modules/graphql-language-service-interface/dist/getAutocompleteSuggestions.js.flow Unexpected token (11:12)
You may need an appropriate loader to handle this file type.
|  */
| 
| import type {
|   FragmentDefinitionNode,
|   GraphQLDirective,

...
```

## Workaround

Enabling the following line near the bottom of `webpack.config.js`, is a potential workaround.

```
new webpack.IgnorePlugin(/\.flow$/)
```



