import('./www-frontend/.output/server/index.mjs')
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
