import {$get,$post} from "@/utils/request"

// 人员查询
export function getTableList({page,size=10}) {
  return $get("/user/find/page", {
    page: 1,
    size:10
  });
}
//编辑
// export function getTableList({page,size=10}) {
//   return $get("/user/find/page", {
//     page: 1,
//     size:10
//   });
// }

//删除 
export function deleteUser() {
  return $get("/user/delete", {
   
  });
}
//新增 
export function addUser() {
  return $get("/user/delete", {
   
  });
}

