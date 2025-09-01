# 前端代码更新指南

## 🎯 需要手动更新的硬编码路径

在将数据迁移到GitHub后，前端代码中还有一些硬编码的本地路径需要手动更新。

## 📁 需要更新的文件

### 1. `src/components/HomeDesign.jsx`

**找到这一行：**
```javascript
const cover = `${"/home/design/cover.jpg"}${import.meta.env.DEV ? `?v=${Date.now()}` : ""}`;
```

**改为：**
```javascript
const cover = `${"https://raw.githubusercontent.com/lytaiyuan/my-portfolio-data/main/home/design/cover.jpg"}${import.meta.env.DEV ? `?v=${Date.now()}` : ""}`;
```

### 2. `src/pages/Home.jsx`

**找到这一行：**
```javascript
<img src="/about.jpg" alt="李洋" className="w-full h-full object-cover" />
```

**改为：**
```javascript
<img src="https://raw.githubusercontent.com/lytaiyuan/my-portfolio-data/main/about.jpg" alt="李洋" className="w-full h-full object-cover" />
```

## 🔧 更新步骤

1. **打开文件编辑器**
2. **搜索硬编码路径**：`/home/design/cover.jpg` 和 `/about.jpg`
3. **替换为GitHub URL**：使用上面的新路径
4. **保存文件**
5. **测试功能**

## 📝 更新后的完整代码示例

### HomeDesign.jsx 更新
```javascript
// src/components/HomeDesign.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HomeDesign() {
  // 更新后的GitHub路径
  const cover = `${"https://raw.githubusercontent.com/lytaiyuan/my-portfolio-data/main/home/design/cover.jpg"}${import.meta.env.DEV ? `?v=${Date.now()}` : ""}`;

  return (
    // ... 其余代码保持不变
  );
}
```

### Home.jsx 更新
```javascript
// src/pages/Home.jsx
// ... 其他代码

<div className="w-36 md:w-40 aspect-[3/4] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
  <img 
    src="https://raw.githubusercontent.com/lytaiyuan/my-portfolio-data/main/about.jpg" 
    alt="李洋" 
    className="w-full h-full object-cover" 
  />
</div>

// ... 其他代码
```

## ✅ 验证更新

更新完成后，请测试以下功能：

1. **Hero图片轮播**：检查hero图片是否正常显示
2. **Home页四个板块**：
   - 照片板块（应该显示第一张照片）
   - 视频板块（应该显示第一个视频）
   - 设计板块（应该显示设计封面图）
   - 音乐板块（应该显示第一个音乐封面）
3. **关于我们**：检查李洋的照片是否正常显示

## 🚨 注意事项

- 确保GitHub仓库已经设置为公开
- 确保所有媒体文件都已上传到GitHub
- 如果图片仍然无法显示，请检查GitHub上的文件路径是否正确

## 📞 技术支持

如果遇到问题，请检查：
1. GitHub仓库是否为公开状态
2. 文件路径是否正确
3. 网络连接是否正常
4. 浏览器控制台是否有错误信息
