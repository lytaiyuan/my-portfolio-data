/**
 * GitHub数据访问工具
 * 用于从GitHub仓库获取作品集数据
 */

class GitHubDataService {
  constructor(repoOwner, repoName, branch = 'main', token = null) {
    this.repoOwner = repoOwner;
    this.repoName = repoName;
    this.branch = branch;
    this.token = token;
    this.isPrivate = !!token;
    
    // 私有仓库使用API，公开仓库使用raw.githubusercontent.com
    if (this.isPrivate) {
      this.baseUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents`;
      this.apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;
    } else {
      this.baseUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}`;
      this.apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;
    }
  }

  /**
   * 获取配置文件
   * @param {string} configPath - 配置文件路径
   * @returns {Promise<Object>} 配置数据
   */
  async getConfig(configPath) {
    try {
      let response;
      
      if (this.isPrivate) {
        // 私有仓库：使用GitHub API获取文件内容
        const headers = this.token ? {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3.raw'
        } : {};
        
        response = await fetch(`${this.baseUrl}/config/${configPath}`, { headers });
        if (!response.ok) {
          throw new Error(`获取配置失败: ${response.status}`);
        }
        return await response.json();
      } else {
        // 公开仓库：直接访问raw.githubusercontent.com
        response = await fetch(`${this.baseUrl}/config/${configPath}`);
        if (!response.ok) {
          throw new Error(`获取配置失败: ${response.status}`);
        }
        return await response.json();
      }
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
   * 获取平面设计数据
   * @returns {Promise<Object>} 平面设计配置
   */
  async getGraphicContent() {
    return await this.getConfig('graphiccontent.json');
  }

  /**
   * 获取英雄区域数据
   * @returns {Promise<Object>} 英雄配置
   */
  async getHero() {
    try {
      let response;
      
      if (this.isPrivate) {
        // 私有仓库：使用GitHub API获取文件内容
        const headers = this.token ? {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3.raw'
        } : {};
        
        response = await fetch(`${this.baseUrl}/hero.json`, { headers });
        if (!response.ok) {
          throw new Error(`获取英雄配置失败: ${response.status}`);
        }
        return await response.json();
      } else {
        // 公开仓库：直接访问raw.githubusercontent.com
        response = await fetch(`${this.baseUrl}/hero.json`);
        if (!response.ok) {
          throw new Error(`获取英雄配置失败: ${response.status}`);
        }
        return await response.json();
      }
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
      let response;
      
      if (this.isPrivate) {
        // 私有仓库：使用GitHub API获取文件内容
        const headers = this.token ? {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3.raw'
        } : {};
        
        response = await fetch(`${this.baseUrl}/packaging.json`, { headers });
        if (!response.ok) {
          throw new Error(`获取包装配置失败: ${response.status}`);
        }
        return await response.json();
      } else {
        // 公开仓库：直接访问raw.githubusercontent.com
        response = await fetch(`${this.baseUrl}/packaging.json`);
        if (!response.ok) {
          throw new Error(`获取包装配置失败: ${response.status}`);
        }
        return await response.json();
      }
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
      let response;
      
      if (this.isPrivate) {
        // 私有仓库：使用GitHub API获取文件内容
        const headers = this.token ? {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3.raw'
        } : {};
        
        response = await fetch(`${this.baseUrl}/vi.json`, { headers });
        if (!response.ok) {
          throw new Error(`获取VI配置失败: ${response.status}`);
        }
        return await response.json();
      } else {
        // 公开仓库：直接访问raw.githubusercontent.com
        response = await fetch(`${this.baseUrl}/vi.json`);
        if (!response.ok) {
          throw new Error(`获取VI配置失败: ${response.status}`);
        }
        return await response.json();
      }
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
      let response;
      
      if (this.isPrivate) {
        // 私有仓库：使用GitHub API获取文件内容
        const headers = this.token ? {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3.raw'
        } : {};
        
        response = await fetch(`${this.baseUrl}/productphotos.json`, { headers });
        if (!response.ok) {
          throw new Error(`获取产品照片配置失败: ${response.status}`);
        }
        return await response.json();
      } else {
        // 公开仓库：直接访问raw.githubusercontent.com
        response = await fetch(`${this.baseUrl}/productphotos.json`);
        if (!response.ok) {
          throw new Error(`获取产品照片配置失败: ${response.status}`);
        }
        return await response.json();
      }
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
    
    if (this.isPrivate) {
      // 私有仓库：使用GitHub API获取文件内容
      // 注意：私有仓库无法直接访问媒体文件，需要通过API获取
      console.warn('私有仓库无法直接访问媒体文件，请使用API方法获取文件内容');
      return null;
    } else {
      // 公开仓库：直接访问raw.githubusercontent.com
      return `${this.baseUrl}${filePath}`;
    }
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
   * 获取私有仓库的媒体文件内容（Base64编码）
   * @param {string} filePath - 文件路径
   * @returns {Promise<string>} Base64编码的文件内容
   */
  async getPrivateMediaContent(filePath) {
    if (!this.isPrivate || !this.token) {
      throw new Error('此方法仅适用于私有仓库且需要Token');
    }

    try {
      const headers = {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json'
      };
      
      const response = await fetch(`${this.baseUrl}${filePath}`, { headers });
      if (!response.ok) {
        throw new Error(`获取媒体文件失败: ${response.status}`);
      }
      
      const data = await response.json();
      return data.content; // GitHub API返回Base64编码的内容
    } catch (error) {
      console.error('获取媒体文件失败:', error);
      throw error;
    }
  }

  /**
   * 获取私有仓库的图片URL（Data URL格式）
   * @param {string} imagePath - 图片路径
   * @returns {Promise<string>} Data URL格式的图片
   */
  async getPrivateImageUrl(imagePath) {
    try {
      const base64Content = await this.getPrivateMediaContent(imagePath);
      const fileExtension = imagePath.split('.').pop();
      const mimeType = this.getMimeType(fileExtension);
      return `data:${mimeType};base64,${base64Content}`;
    } catch (error) {
      console.error('获取私有图片失败:', error);
      throw error;
    }
  }

  /**
   * 根据文件扩展名获取MIME类型
   * @param {string} extension - 文件扩展名
   * @returns {string} MIME类型
   */
  getMimeType(extension) {
    const mimeTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
      'pdf': 'application/pdf',
      'mp3': 'audio/mpeg',
      'mp4': 'video/mp4',
      'txt': 'text/plain'
    };
    return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
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
// 注意：私有仓库需要提供GitHub Token
// const defaultService = new GitHubDataService('your-username', 'my-portfolio-data', 'main', 'your-github-token');

// 创建不带Token的实例（仅用于公开仓库）
const defaultService = new GitHubDataService('your-username', 'my-portfolio-data');

export default GitHubDataService;
export { defaultService };
