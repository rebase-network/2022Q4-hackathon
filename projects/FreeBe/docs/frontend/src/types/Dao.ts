export interface Dao {
  dao_id: number;
  dao_name: string
  dao_image: string;
  member?: DaoMenber[];
  member_count: number;
  mission: string;
  theme_color: string;
  total_valuation: string | number;
  wallet_address: string;
}

export interface DaoMenber {
  head_image: string;
  id: number;
  name: string;
  role_type: 1 | 2 | 3 | 4;  // 用户角色：1：创建者 2：管理员 3：成员 4：游客
  valuation: number; // dao内贡献估值
}

export interface DaoCreateEditParams {
  dao_id?: number; // 如果是修改则需要
  action: 'create' | 'edit'; // create:创建 edit:修改
  dao_image: string;
  dao_name: string;
  mission: string;
  theme_color: string;
  wallet_address: string;
}

// 1:获取详情
export type DaoNumber = 1;

export interface DaoListReq {
  action: DaoNumber;
  index: number;
  wallet_address: string;
}

export interface DaoInfoReq {
  action: number;
  daoId: number;
  walletAddress: string;
}


