# 前端代码更新指南

## 🎯 需要手动更新的硬编码路径

在将数据迁移到GitHub后，前端代码中还有一些硬编码的本地路径需要手动更新。

## ✅ 好消息

**所有必要的文件现在都已经上传到GitHub了！** 包括：
- ✅ Hero图片（hero.json + hero/目录）
- ✅ 设计封面图（home/design/cover.jpg）
- ✅ 所有配置文件（photos.json, music.json, videos.json等）

## 📁 需要更新的文件

**实际上，前端代码中没有任何硬编码路径需要修改！**

### 1. `src/components/HomeDesign.jsx`

**保持原样，不需要修改：**
```javascript
const cover = `${"/home/design/cover.jpg"}${import.meta.env.DEV ? `?v=${Date.now()}` : ""}`;
```

### 2. `src/pages/Home.jsx`

**关于我们图片保持原样，不需要修改：**
```javascript
<img src="/about.jpg" alt="李洋" className="w-full h-full object-cover" />
```

## 🔧 更新步骤

**好消息：不需要修改任何前端代码！**

所有必要的文件都已经在GitHub上了，前端代码可以保持原样。

## 📝 代码示例

### HomeDesign.jsx - 保持原样
```javascript
// src/components/HomeDesign.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HomeDesign() {
  // 保持原样，不需要修改
  const cover = `${"/home/design/cover.jpg"}${import.meta.env.DEV ? `?v=${Date.now()}` : ""}`;

  return (
    // ... 其余代码保持不变
  );
}
```

### Home.jsx - 保持原样
```javascript
// src/pages/Home.jsx
// ... 其他代码

<div className="w-36 md:w-40 aspect-[4/3] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
  <img 
    src="/about.jpg"  // 保持原样，不需要修改
    alt="李洋" 
    className="w-full h-full object-cover" 
  />
</div>

// ... 其他代码
```

## ✅ 验证更新

现在所有功能都应该正常工作了：

1. **Hero图片轮播**：检查hero图片是否正常显示
2. **Home页四个板块**：
   - 照片板块（应该显示第一张照片）
   - 视频板块（应该显示第一个视频）
   - 设计板块（应该显示设计封面图）
   - 音乐板块（应该显示第一个音乐封面）
3. **关于我们**：检查李洋的照片是否正常显示

## 🚨 注意事项

- 确保GitHub仓库已经设置为公开
- 所有媒体文件都已上传到GitHub
- 如果图片仍然无法显示，请检查GitHub上的文件路径是否正确

## 📞 技术支持

如果遇到问题，请检查：
1. GitHub仓库是否为公开状态
2. 文件路径是否正确
3. 网络连接是否正常
4. 浏览器控制台是否有错误信息

## 🎉 完成状态

- ✅ 所有JSON配置文件已更新为GitHub URL
- ✅ 所有媒体文件已上传到GitHub
- ✅ Hero图片配置已更新
- ✅ 前端代码无需修改！

## 💡 关于静态图片的说明

**以下图片都是静态的，不需要迁移到GitHub：**
- **About图片**：`/about.jpg` - 关于我们页面图片
- **设计封面图**：`/home/design/cover.jpg` - Home页设计板块封面

这些图片直接写死在前端代码中即可，因为：
- 它们是静态的，不需要动态更新
- 保持原来的本地路径更简单
- 不需要额外的网络请求
