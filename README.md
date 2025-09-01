# My Portfolio Data Repository

这是my-portfolio作品集网站的数据仓库，包含所有内容文件和配置文件。

## 目录结构

```
├── photos/           # 照片文件
├── music/            # 音乐相关文件
├── videos/           # 视频相关文件
├── graphic/          # 平面设计文件
├── packaging/        # 包装设计文件
├── vi/               # VI设计文件
├── config/           # JSON配置文件
└── README.md         # 本文件
```

## 配置文件

- `config/photos.json` - 照片数据配置
- `config/music.json` - 音乐数据配置
- `config/videos.json` - 视频数据配置
- `config/graphiccontent.json` - 平面设计配置
- `packaging.json` - 包装设计配置
- `vi.json` - VI设计配置
- `productphotos.json` - 产品照片配置
- `hero.json` - 主页英雄区域配置

## 使用说明

前端应用通过GitHub raw文件URL直接访问这些数据文件，无需认证，实现内容的云端存储和访问。

## 更新流程

1. 在本地修改内容文件
2. 更新对应的JSON配置文件
3. 提交到GitHub仓库
4. 前端自动获取最新数据

## 注意事项

- 所有文件路径使用相对路径
- 图片文件建议使用JPG/PNG格式
- 视频文件建议使用MP4格式
- 音频文件建议使用MP3格式
