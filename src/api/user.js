import http from "@/utils/request";

export async function login(data) {
  return await http.login("/api/Login/Merchant", data);
}

export async function getInfo() {
  return http.get("/api/sysUser/getInfo");
}

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
  });
}
