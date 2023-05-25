# VeggieCrunch

np
### Steps to add functionality to the starter code.
#### Server side
- Add any new models and realationships in the `server/models` folder.
- Add the new type to the `server/schema/typeDefs.js`
- Add any new queries or mutations related to the new type in the typeDefs.
- Add the queries and mutations to the `server/schema/resolvers.js` file to link up the typedefs to the mongoose models.
- Add any seeds to `server/seeders` if desired. Having seeds makes testing and prototyping easier.

- Test the queries and mutations in the graphql playground to ensure they behave as expected

#### Client side
- Create a new front-end route if needed by adding another `<Route>` to the existing ones in `client/src/App.js`
- Create the new page in `client/src/pages/<page name>.js` also create any sub components if needed in `client/src/components/<component name>/index.js`
- Add the new queries and mutations to the `client/src/utils/mutations.js` or `queries.js` (these should be confirmed working in the graphql playground first);
- Add the query/mutations using the `useQuery` or `useMutation` hooks from apollo.

Tan
#7E5A44

Seafoam Green
#C3E1D9

Emerald Green
#02894B

Black
#000000

Lime Green
#8FA01F

Green
#1D741B

Chartreuse
#8BCD50

Yellow Green
#DED93E

#4CAF50