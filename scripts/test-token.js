#!/usr/bin/env node

/**
 * GitHub Token和仓库访问测试脚本
 * 用于验证Token是否有效以及能否访问仓库
 */

const GITHUB_TOKEN = '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';
const REPO_OWNER = 'lytaiyuan';
const REPO_NAME = 'my-portfolio-data';

/**
 * 验证GitHub Token
 */
async function validateToken() {
  console.log('🔐 正在验证GitHub Token...');
  
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (response.ok) {
      const userData = await response.json();
      console.log('✅ Token验证成功！');
      console.log(`   用户: ${userData.login}`);
      console.log(`   邮箱: ${userData.email || '未公开'}`);
      console.log(`   仓库数量: ${userData.public_repos + userData.total_private_repos}`);
      return true;
    } else {
      console.log(`❌ Token验证失败: ${response.status}`);
      console.log(`   错误信息: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Token验证出错:', error.message);
    return false;
  }
}

/**
 * 检查仓库访问权限
 */
async function checkRepoAccess() {
  console.log('\n🏗️  正在检查仓库访问权限...');
  
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (response.ok) {
      const repoData = await response.json();
      console.log('✅ 仓库访问成功！');
      console.log(`   仓库名称: ${repoData.name}`);
      console.log(`   仓库类型: ${repoData.private ? '私有' : '公开'}`);
      console.log(`   描述: ${repoData.description || '无描述'}`);
      console.log(`   创建时间: ${new Date(repoData.created_at).toLocaleString()}`);
      console.log(`   最后更新: ${new Date(repoData.updated_at).toLocaleString()}`);
      return true;
    } else if (response.status === 404) {
      console.log('❌ 仓库不存在');
      console.log(`   请确保仓库 ${REPO_OWNER}/${REPO_NAME} 已创建`);
      return false;
    } else {
      console.log(`❌ 仓库访问失败: ${response.status}`);
      console.log(`   错误信息: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.log('❌ 仓库访问检查出错:', error.message);
    return false;
  }
}

/**
 * 测试配置文件访问
 */
async function testConfigAccess() {
  console.log('\n📁 正在测试配置文件访问...');
  
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/config/photos.json`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3.raw'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ 配置文件访问成功！');
      console.log(`   照片数量: ${data.items ? data.items.length : '未知'}`);
      console.log(`   版本: ${data.version || '未知'}`);
      return true;
    } else {
      console.log(`❌ 配置文件访问失败: ${response.status}`);
      console.log(`   错误信息: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.log('❌ 配置文件访问测试出错:', error.message);
    return false;
  }
}

/**
 * 主测试函数
 */
async function runTests() {
  console.log('🚀 开始GitHub Token和仓库访问测试...\n');
  
  const tokenValid = await validateToken();
  if (!tokenValid) {
    console.log('\n❌ Token验证失败，请检查Token是否正确');
    process.exit(1);
  }
  
  const repoAccessible = await checkRepoAccess();
  if (!repoAccessible) {
    console.log('\n❌ 仓库访问失败，请确保仓库已创建');
    process.exit(1);
  }
  
  const configAccessible = await testConfigAccess();
  if (!configAccessible) {
    console.log('\n⚠️  配置文件访问失败，可能是仓库中还没有数据');
  }
  
  console.log('\n🎉 所有测试完成！');
  console.log('   现在可以推送数据到GitHub仓库了');
}

// 运行测试
runTests().catch(console.error);
