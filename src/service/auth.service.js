const connection = require('../app/database')

class authService {
  // 根据用户id获取用户角色
  async getRoleByUserId(id) {
    const statement = `
    SELECT users.id, users.name, role.rolename '角色', role_id
    FROM users
    LEFT JOIN role ON users.role_id = role.id
    WHERE users.id = ?;
    `;

    const [result] = await connection.execute(statement, [id])
    return result
  }
    // 获取菜单
    async getMenusData() {
      const statement = `
      SELECT ms.id id, ms.name name, ms.icon icon, ms.type type, ms.menuUrl menuUrl,
          JSON_ARRAYAGG(JSON_OBJECT('parentId', cms.parentId, 'name', cms.name, 'icon', cms.icon, 'type', cms.type, 'menuUrl', cms.menuUrl)) children
      FROM menus ms
      JOIN menus_childmenus mcms ON ms.id = mcms.menus_id
      JOIN childmenus cms ON mcms.childmenus_id = cms.id
      GROUP BY ms.id;
      `;
      const [result] = await connection.execute(statement)  
      return result
    }
    // 根据角色id获取角色菜单
    async getMenusByRoleId(roleId) {
      const statement = `
      SELECT role.id roleId,
              JSON_ARRAYAGG(JSON_OBJECT('id', menus.id, 'name', menus.name, 'icon', menus.icon, 'type', menus.type, 'menuUrl', menus.menuUrl, 'children', chmenus.children)) roleMenus
      FROM role
      JOIN role_menus rom ON role.id = rom.role_id
      JOIN menus ON rom.menus_id = menus.id
      LEFT JOIN (
              SELECT ms.id id, ms.name name, ms.icon icon, ms.type type, ms.menuUrl menuUrl,
                JSON_ARRAYAGG(JSON_OBJECT('id', cms.id, 'parentId', cms.parentId, 'name', cms.name, 'icon', cms.icon, 'type', cms.type, 'menuUrl', cms.menuUrl)) children
              FROM menus ms
              JOIN menus_childmenus mcms ON ms.id = mcms.menus_id
              JOIN childmenus cms ON mcms.childmenus_id = cms.id
              GROUP BY ms.id
      ) chmenus ON menus.id = chmenus.id
      WHERE role.id = ?
      GROUP BY role.id;
      `;
      const [result] = await connection.execute(statement, [roleId])  
      return result
    }
    // 获取角色列表
    async getRoleListData() {
      const statement = `SELECT * from role;`;
      const [result] = await connection.execute(statement)
      return result
    }
    // 根据条件查询角色列表
    async queryRoleListData(id, rolename) {
      const statement = `SELECT * from role
      WHERE role.rolename = ? OR role.id = ?;`;
      const [result] = await connection.execute(statement, [rolename, id])
      return result
    }
}

module.exports = new authService()
