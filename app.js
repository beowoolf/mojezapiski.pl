process.env.IPX_MAX_AGE = 31536000
import('./www-frontend/.output/server/index.mjs')
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
