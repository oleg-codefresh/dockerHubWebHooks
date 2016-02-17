var dockerInfo = {
  reponame: process.env.REPO_NAME,
  dockerfile: process.env.Dockerfile || 'Dockerfile',
  dockerfiledev: process.env.DockerfileDev || 'Dockerfile.dev'
};

var dockerHooks = {
  onTag : process.env.tagHook || 'pull'
};

var docker =  {
 info: dockerInfo,
 onTag : dockerHooks
}

module.exports = dockerInfo;
