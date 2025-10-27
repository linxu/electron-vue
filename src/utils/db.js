const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

class DB {
  constructor() {
    // 数据库文件路径（存储在 Electron 应用的用户数据目录）
    const dbPath = path.join(app.getPath('userData'), 'app.db');
    this.db = new Database(dbPath); // 连接数据库（文件不存在会自动创建）
    this.initTables(); // 初始化数据表
  }

  // 初始化数据表（如用户表）
  initTables() {
    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        createTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `).run();
  }

  // 新增用户
  addUser(name, age) {
    const stmt = this.db.prepare('INSERT INTO users (name, age) VALUES (?, ?)');
    const result = stmt.run(name, age);
    return { id: result.lastInsertRowid }; // 返回新增的 ID
  }

  // 查询所有用户
  getAllUsers() {
    const stmt = this.db.prepare('SELECT * FROM users');
    return stmt.all(); // 返回所有用户数组
  }

  // 根据 ID 更新用户
  updateUser(id, data) {
    const { name, age } = data;
    const stmt = this.db.prepare('UPDATE users SET name = ?, age = ? WHERE id = ?');
    return stmt.run(name, age, id);
  }

  // 根据 ID 删除用户
  deleteUser(id) {
    const stmt = this.db.prepare('DELETE FROM users WHERE id = ?');
    return stmt.run(id);
  }
}

// 导出单例实例（确保全局唯一数据库连接）
module.exports = new DB();