const globby = require('globby');

(async () => {
  const paths = await globby('api', {
    expandDirectories: {
      files: ['*.js'],
      extensions: ['js']
    }
  });

  console.log(paths);
  //=> ['cat.png', 'unicorn.png', 'cow.jpg', 'rainbow.jpg']
})();