/**
 * GitHub配置文件
 * 用于配置GitHub仓库信息和访问Token
 */

export const GITHUB_CONFIG = {
  // 仓库信息
  REPO_OWNER: 'your-username',        // 替换为您的GitHub用户名
  REPO_NAME: 'my-portfolio-data',     // 仓库名称
  BRANCH: 'main',                     // 分支名称
  
  // GitHub Token（私有仓库必需）
  // 注意：请将Token存储在环境变量中，不要直接写在代码里
  TOKEN: process.env.GITHUB_TOKEN || null,
  
  // 仓库设置
  IS_PRIVATE: true,                   // 是否为私有仓库
  
  // API设置
  API_BASE_URL: 'https://api.github.com',
  RAW_BASE_URL: 'https://raw.githubusercontent.com',
  
  // 请求设置
  REQUEST_TIMEOUT: 10000,             // 请求超时时间（毫秒）
  MAX_RETRIES: 3,                     // 最大重试次数
};

/**
 * 创建GitHub数据服务实例
 * @param {string} token - GitHub Personal Access Token
 * @returns {GitHubDataService} 数据服务实例
 */
export function createGitHubService(token = null) {
  const { REPO_OWNER, REPO_NAME, BRANCH } = GITHUB_CONFIG;
  const finalToken = token || GITHUB_CONFIG.TOKEN;
  
  if (GITHUB_CONFIG.IS_PRIVATE && !finalToken) {
    throw new Error('私有仓库需要提供GitHub Token');
  }
  
  // 动态导入GitHubDataService类
  return import('./github-data.js').then(module => {
    const { GitHubDataService } = module;
    return new GitHubDataService(REPO_OWNER, REPO_NAME, BRANCH, finalToken);
  });
}

/**
 * 验证GitHub Token
 * @param {string} token - GitHub Token
 * @returns {Promise<boolean>} 是否有效
 */
export async function validateGitHubToken(token) {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (response.ok) {
      const userData = await response.json();
      console.log('Token验证成功，用户:', userData.login);
      return true;
    } else {
      console.error('Token验证失败:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Token验证出错:', error);
    return false;
  }
}

/**
 * 检查仓库访问权限
 * @param {string} token - GitHub Token
 * @returns {Promise<boolean>} 是否有访问权限
 */
export async function checkRepoAccess(token) {
  try {
    const { REPO_OWNER, REPO_NAME } = GITHUB_CONFIG;
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (response.ok) {
      const repoData = await response.json();
      console.log('仓库访问成功:', repoData.name);
      console.log('仓库类型:', repoData.private ? '私有' : '公开');
      return true;
    } else {
      console.error('仓库访问失败:', response.status);
      return false;
    }
  } catch (error) {
    console.error('仓库访问检查出错:', error);
    return false;
  }
}

export default GITHUB_CONFIG;
