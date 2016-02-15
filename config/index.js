var dockerInfo = {
  reponame: process.env.REPO_NAME,
  dockerfile: process.env.Dockerfile || 'Dockerfile',
  dockerfiledev: process.env.DockerfileDev || 'Dockerfile.dev'
};

module.exports = dockerInfo;
