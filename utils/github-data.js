/**
 * GitHub数据访问工具
 * 用于从GitHub仓库获取作品集数据
 */

class GitHubDataService {
  constructor(repoOwner, repoName, branch = 'main') {
    this.repoOwner = repoOwner;
    this.repoName = repoName;
    this.branch = branch;
    this.baseUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}`;
    this.apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;
  }

  /**
   * 获取配置文件
   * @param {string} configPath - 配置文件路径
   * @returns {Promise<Object>} 配置数据
   */
  async getConfig(configPath) {
    try {
      const response = await fetch(`${this.baseUrl}/config/${configPath}`);
      if (!response.ok) {
        throw new Error(`获取配置失败: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取配置失败:', error);
      throw error;
    }
  }

  /**
   * 获取照片数据
   * @returns {Promise<Object>} 照片配置
   */
  async getPhotos() {
    return await this.getConfig('photos.json');
  }

  /**
   * 获取音乐数据
   * @returns {Promise<Object>} 音乐配置
   */
  async getMusic() {
    return await this.getConfig('music.json');
  }

  /**
   * 获取视频数据
   * @returns {Promise<Object>} 视频配置
   */
  async getVideos() {
    return await this.getConfig('videos.json');
  }

  /**
   * 获取设计作品数据
   * @returns {Promise<Object>} 设计配置
   */
  async getDesign() {
    return await this.getConfig('design.json');
  }

  /**
   * 获取英雄区域数据
   * @returns {Promise<Object>} 英雄配置
   */
  async getHero() {
    try {
      const response = await fetch(`${this.baseUrl}/hero.json`);
      if (!response.ok) {
        throw new Error(`获取英雄配置失败: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取英雄配置失败:', error);
      throw error;
    }
  }

  /**
   * 获取包装设计数据
   * @returns {Promise<Object>} 包装配置
   */
  async getPackaging() {
    try {
      const response = await fetch(`${this.baseUrl}/packaging.json`);
      if (!response.ok) {
        throw new Error(`获取包装配置失败: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取包装配置失败:', error);
      throw error;
    }
  }

  /**
   * 获取VI设计数据
   * @returns {Promise<Object>} VI配置
   */
  async getVI() {
    try {
      const response = await fetch(`${this.baseUrl}/vi.json`);
      if (!response.ok) {
        throw new Error(`获取VI配置失败: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取VI配置失败:', error);
      throw error;
    }
  }

  /**
   * 获取产品照片数据
   * @returns {Promise<Object>} 产品照片配置
   */
  async getProductPhotos() {
    try {
      const response = await fetch(`${this.baseUrl}/productphotos.json`);
      if (!response.ok) {
        throw new Error(`获取产品照片配置失败: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取产品照片配置失败:', error);
      throw error;
    }
  }

  /**
   * 获取媒体文件URL
   * @param {string} filePath - 文件路径
   * @returns {string} 完整的GitHub文件URL
   */
  getMediaUrl(filePath) {
    if (filePath.startsWith('http')) {
      return filePath; // 如果是外部链接，直接返回
    }
    return `${this.baseUrl}${filePath}`;
  }

  /**
   * 获取图片URL
   * @param {string} imagePath - 图片路径
   * @returns {string} 完整的GitHub图片URL
   */
  getImageUrl(imagePath) {
    return this.getMediaUrl(imagePath);
  }

  /**
   * 获取音频URL
   * @param {string} audioPath - 音频路径
   * @returns {string} 完整的GitHub音频URL
   */
  getAudioUrl(audioPath) {
    return this.getMediaUrl(audioPath);
  }

  /**
   * 获取视频URL
   * @param {string} videoPath - 视频路径
   * @returns {string} 完整的GitHub视频URL
   */
  getVideoUrl(videoPath) {
    return this.getMediaUrl(videoPath);
  }

  /**
   * 获取文档URL
   * @param {string} docPath - 文档路径
   * @returns {string} 完整的GitHub文档URL
   */
  getDocumentUrl(docPath) {
    return this.getMediaUrl(docPath);
  }

  /**
   * 检查仓库状态
   * @returns {Promise<Object>} 仓库信息
   */
  async checkRepoStatus() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`检查仓库状态失败: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('检查仓库状态失败:', error);
      throw error;
    }
  }

  /**
   * 获取仓库最新提交
   * @returns {Promise<Object>} 最新提交信息
   */
  async getLatestCommit() {
    try {
      const response = await fetch(`${this.apiUrl}/commits/${this.branch}`);
      if (!response.ok) {
        throw new Error(`获取最新提交失败: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取最新提交失败:', error);
      throw error;
    }
  }
}

// 创建默认实例
const defaultService = new GitHubDataService('your-username', 'my-portfolio-data');

export default GitHubDataService;
export { defaultService };
