# 前端集成自述文件

## 🎯 项目概述

这是一个React作品集网站的数据仓库，所有内容数据已迁移到GitHub私有仓库。前端需要从本地文件读取改为从GitHub API读取数据。

## 🔐 认证信息

- **仓库**: `lytaiyuan/my-portfolio-data`
- **类型**: 私有仓库
- **Token**: `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`
- **分支**: `main`
- **API基础URL**: `https://api.github.com/repos/lytaiyuan/my-portfolio-data/contents`

## 📁 文件结构

```
my-portfolio-data/
├── config/                    # 配置文件目录
│   ├── photos.json           # 照片配置 (24张照片)
│   ├── music.json            # 音乐配置 (2首音乐)
│   ├── videos.json           # 视频配置 (3个视频)
│   └── graphiccontent.json   # 平面设计配置 (1个项目)
├── photos/                    # 照片文件目录
│   ├── 1.jpg, 2.jpg, 3.jpg... # 24张照片文件
│   └── DSC*.jpg              # 原始相机文件
├── music/                     # 音乐相关文件
│   ├── Epic/                 # Epic音乐项目
│   │   ├── cover.jpg         # 封面
│   │   ├── Epic.txt          # 描述文件
│   │   └── score/            # 乐谱图片
│   └── AnotherSong/          # Another Song项目
│       ├── cover.jpg         # 封面
│       ├── AnotherSong.txt   # 描述文件
│       └── score/            # 乐谱图片
├── videos/                    # 视频相关文件
│   ├── yuntingfinal/         # 听见自己，听见你
│   ├── 2023/                 # 流转2023
│   └── weishan/              # 巍山烟雨
├── graphic/                   # 平面设计文件
│   └── km/                   # 春城湖畔度假村项目
├── packaging/                 # 包装设计文件
│   ├── bupin/                # 补品包装设计
│   └── oufen/                # 藕粉包装设计
├── vi/                        # VI设计文件
│   └── km/                   # 品牌视觉手册
├── home/                      # 主页相关文件
│   └── design/               # 主页设计元素
├── hero.json                  # 主页英雄区域配置
├── packaging.json             # 包装设计配置
├── vi.json                    # VI设计配置
├── productphotos.json         # 产品照片配置
└── utils/                     # 工具文件
    └── github-data.js        # GitHub数据访问工具
```

## 🌐 API接口

### 请求头要求
```
Authorization: token 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
Accept: application/vnd.github.v3.raw
```

### 主要接口

#### 1. 照片数据
- **URL**: `GET /repos/lytaiyuan/my-portfolio-data/contents/config/photos.json`
- **返回**: 24张照片的配置信息
- **用途**: Photos页面数据

#### 2. 音乐数据
- **URL**: `GET /repos/lytaiyuan/my-portfolio-data/contents/config/music.json`
- **返回**: 2首音乐的配置信息
- **用途**: Music页面数据

#### 3. 视频数据
- **URL**: `GET /repos/lytaiyuan/my-portfolio-data/contents/config/videos.json`
- **返回**: 3个视频的配置信息
- **用途**: Videos页面数据

#### 4. 平面设计数据
- **URL**: `GET /repos/lytaiyuan/my-portfolio-data/contents/config/graphiccontent.json`
- **返回**: 平面设计项目配置
- **用途**: Design页面数据

#### 5. 其他配置文件
- **英雄区域**: `GET /repos/lytaiyuan/my-portfolio-data/contents/hero.json`
- **包装设计**: `GET /repos/lytaiyuan/my-portfolio-data/contents/packaging.json`
- **VI设计**: `GET /repos/lytaiyuan/my-portfolio-data/contents/vi.json`
- **产品照片**: `GET /repos/lytaiyuan/my-portfolio-data/contents/productphotos.json`

## 📊 数据格式

### 照片配置示例 (photos.json)
```json
{
  "version": "2025.08.29-1",
  "items": [
    {
      "id": 1,
      "url": "/photos/DSC01227.jpg",
      "title": "仰望",
      "tags": ["女人","民族","室内"],
      "w": 4314,
      "h": 6471,
      "desc": "位于云南省红河彝族哈尼族自治州，via：王默涵。"
    }
  ]
}
```

### 音乐配置示例 (music.json)
```json
{
  "version": "2025.01.29-1",
  "items": [
    {
      "id": 1,
      "slug": "epic",
      "title": "Epic",
      "hottitle": "史诗级配乐",
      "cover": "/music/Epic/cover.jpg",
      "duration": "3:45"
    }
  ]
}
```

### 视频配置示例 (videos.json)
```json
{
  "version": "2025.08.29-3",
  "items": [
    {
      "id": 1,
      "slug": "tingjian-ziji-tingjian-ni",
      "title": "听见自己，听见你",
      "poster": "/videos/yuntingfinal/yuntingfinal.jpg",
      "duration": "3:34"
    }
  ]
}
```

## 🔧 前端集成步骤

### 1. 安装依赖
```bash
npm install dotenv
```

### 2. 创建环境变量文件 (.env)
```bash
GITHUB_TOKEN=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
GITHUB_USERNAME=lytaiyuan
GITHUB_REPO_NAME=my-portfolio-data
```

### 3. 替换数据获取逻辑
将原来的静态导入改为API调用：

**原来:**
```javascript
import photosData from '../../public/photos.json';
const photos = photosData.items;
```

**改为:**
```javascript
const [photos, setPhotos] = useState([]);

useEffect(() => {
  const fetchPhotos = async () => {
    const response = await fetch(
      'https://api.github.com/repos/lytaiyuan/my-portfolio-data/contents/config/photos.json',
      {
        headers: {
          'Authorization': 'token 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',
          'Accept': 'application/vnd.github.v3.raw'
        }
      }
    );
    const data = await response.json();
    setPhotos(data.items);
  };
  
  fetchPhotos();
}, []);
```

## ⚠️ 重要注意事项

### 1. 私有仓库限制
- 媒体文件无法直接通过URL访问
- 需要通过GitHub API获取Base64编码内容
- 所有请求都需要Token认证

### 2. 安全考虑
- Token不要提交到Git仓库
- 使用环境变量管理敏感信息
- 在生产环境中安全配置Token

### 3. 性能优化
- 实现数据缓存机制
- 添加加载状态和错误处理
- 考虑使用React Query或SWR

### 4. 媒体文件处理
由于是私有仓库，图片等媒体文件需要特殊处理：

```javascript
// 获取图片的Base64内容
const getImageContent = async (imagePath) => {
  const response = await fetch(
    `https://api.github.com/repos/lytaiyuan/my-portfolio-data/contents${imagePath}`,
    {
      headers: {
        'Authorization': 'token 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',
        'Accept': 'application/vnd.github.v3+json'
      }
    }
  );
  
  const data = await response.json();
  return `data:image/jpeg;base64,${data.content}`;
};
```

## 🚀 调试建议

1. **先测试API**: 使用Postman或浏览器测试API是否能正常返回数据
2. **逐步替换**: 一个页面一个页面地替换数据获取逻辑
3. **错误处理**: 添加适当的错误处理和用户提示
4. **性能监控**: 监控API请求的性能和成功率

## 📞 技术支持

如果遇到问题，请检查：
1. Token是否有效
2. 仓库权限是否正确
3. API请求头是否完整
4. 网络连接是否正常

---

**注意**: 这是一个私有仓库，所有访问都需要通过GitHub API进行认证。
