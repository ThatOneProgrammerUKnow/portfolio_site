// Studio sidebar: the singletons (pages + site settings) first, then Projects.
// .singletons() adds every singleton registered in sanity.config.js (call it after .items()).
export const structure = (S) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())
    .singletons();
