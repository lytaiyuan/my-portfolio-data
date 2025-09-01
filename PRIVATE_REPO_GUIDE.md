# 私有仓库使用指南

本指南说明如何在私有GitHub仓库中使用my-portfolio-data数据仓库。

## 1. 创建GitHub Personal Access Token

### 1.1 生成Token
1. 访问 [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. 点击 "Generate new token (classic)"
3. 填写描述：`My Portfolio Data Access`
4. 选择权限：
   - ✅ `repo` (完整的仓库访问权限)
   - ✅ `read:packages` (如果需要)
5. 点击 "Generate token"
6. **重要**: 复制并保存Token，它只会显示一次！

### 1.2 Token权限说明
- `repo`: 访问私有仓库的完整权限
- 包含读取所有仓库内容的能力
- 适合私有仓库的数据访问

## 2. 配置环境变量

### 2.1 创建.env文件
复制 `env.example` 为 `.env` 文件：

```bash
cp env.example .env
```

### 2.2 编辑.env文件
```bash
# GitHub配置
GITHUB_TOKEN=ghp_your_actual_token_here
GITHUB_USERNAME=your_actual_username
GITHUB_REPO_NAME=my-portfolio-data
GITHUB_BRANCH=main

# 应用配置
NODE_ENV=development
PORT=3000
```

## 3. 前端集成

### 3.1 使用配置文件
```javascript
import { createGitHubService, validateGitHubToken, checkRepoAccess } from './config/github-config';

// 验证Token
const isValid = await validateGitHubToken(process.env.GITHUB_TOKEN);
if (!isValid) {
  console.error('GitHub Token无效');
  return;
}

// 检查仓库访问权限
const hasAccess = await checkRepoAccess(process.env.GITHUB_TOKEN);
if (!hasAccess) {
  console.error('无法访问仓库');
  return;
}

// 创建数据服务实例
const githubService = await createGitHubService(process.env.GITHUB_TOKEN);
```

### 3.2 获取数据
```javascript
// 获取照片数据
const photos = await githubService.getPhotos();

// 获取音乐数据
const music = await githubService.getMusic();

// 获取视频数据
const videos = await githubService.getVideos();

// 获取平面设计数据
const graphicContent = await githubService.getGraphicContent();
```

### 3.3 处理媒体文件
```javascript
// 对于私有仓库，使用特殊方法获取媒体文件
if (githubService.isPrivate) {
  // 获取图片（Data URL格式）
  const imageUrl = await githubService.getPrivateImageUrl('/photos/image.jpg');
  
  // 获取文件内容（Base64编码）
  const fileContent = await githubService.getPrivateMediaContent('/music/song.mp3');
} else {
  // 公开仓库直接使用URL
  const imageUrl = githubService.getImageUrl('/photos/image.jpg');
}
```

## 4. 安全注意事项

### 4.1 Token安全
- **永远不要**将Token提交到Git仓库
- 使用环境变量存储Token
- 定期轮换Token
- 限制Token的权限范围

### 4.2 环境变量管理
```bash
# 开发环境
echo "GITHUB_TOKEN=your_token" >> .env

# 生产环境
export GITHUB_TOKEN=your_token
```

### 4.3 错误处理
```javascript
try {
  const data = await githubService.getPhotos();
  // 处理数据
} catch (error) {
  if (error.message.includes('401')) {
    console.error('Token无效或已过期');
  } else if (error.message.includes('403')) {
    console.error('没有访问权限');
  } else if (error.message.includes('404')) {
    console.error('文件不存在');
  } else {
    console.error('未知错误:', error);
  }
}
```

## 5. 性能优化

### 5.1 缓存策略
```javascript
// 使用React Query或SWR缓存API响应
import { useQuery } from 'react-query';

function Photos() {
  const { data: photos, isLoading, error } = useQuery(
    'photos',
    () => githubService.getPhotos(),
    {
      staleTime: 5 * 60 * 1000, // 5分钟
      cacheTime: 10 * 60 * 1000, // 10分钟
    }
  );
  
  // 渲染逻辑
}
```

### 5.2 批量请求
```javascript
// 同时获取多个配置文件
const [photos, music, videos] = await Promise.all([
  githubService.getPhotos(),
  githubService.getMusic(),
  githubService.getVideos()
]);
```

### 5.3 懒加载
```javascript
// 只在需要时加载数据
const { data: photos } = useQuery(
  'photos',
  () => githubService.getPhotos(),
  {
    enabled: isPhotosPageVisible, // 只在页面可见时加载
  }
);
```

## 6. 故障排除

### 6.1 常见问题

1. **401 Unauthorized**
   - Token无效或已过期
   - 重新生成Token

2. **403 Forbidden**
   - Token权限不足
   - 检查Token权限设置

3. **404 Not Found**
   - 文件路径错误
   - 检查仓库和分支名称

4. **API Rate Limit**
   - 超过API请求限制
   - 实现请求缓存和重试

### 6.2 调试技巧

1. **检查Token**
```javascript
const isValid = await validateGitHubToken(token);
console.log('Token有效:', isValid);
```

2. **检查仓库访问**
```javascript
const hasAccess = await checkRepoAccess(token);
console.log('仓库访问:', hasAccess);
```

3. **查看API响应**
```javascript
const response = await fetch('https://api.github.com/user', {
  headers: { 'Authorization': `token ${token}` }
});
console.log('API状态:', response.status);
console.log('API响应:', await response.json());
```

## 7. 部署配置

### 7.1 开发环境
```bash
# 本地开发
npm run dev
```

### 7.2 生产环境
```bash
# 设置环境变量
export GITHUB_TOKEN=your_production_token

# 启动应用
npm start
```

### 7.3 Docker部署
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# 运行容器
docker run -e GITHUB_TOKEN=your_token -p 3000:3000 my-portfolio
```

## 8. 监控和维护

### 8.1 API使用监控
- 监控API请求频率
- 检查Token使用情况
- 跟踪错误率

### 8.2 定期维护
- 检查Token有效期
- 更新依赖包
- 审查安全设置

---

**重要提醒**: 请妥善保管您的GitHub Token，不要将其暴露在公共代码中！
