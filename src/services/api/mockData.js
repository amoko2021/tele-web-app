// Mock data cho development
export const mockXSMBData = {
  countNumbers: 27,
  time: '2-1-2026',
  results: {
    ĐB: ['45748'],
    G1: ['11781'],
    G2: ['80531', '23392'],
    G3: ['76928', '84288', '38636', '47152', '36104', '66867'],
    G4: ['0981', '5060', '0292', '2714'],
    G5: ['5289', '9150', '7983', '5222', '5023', '9475'],
    G6: ['641', '853', '159'],
    G7: ['29', '24', '38', '22'],
  },
}

export const mockUserInfo = {
  ok: true,
  data: {
    user_id: 123456,
    balance: 1000.5,
    coins: 5000,
    wallet: 'DUONG VAN DOAN - 0385901122 - VPBANK',
    join_date: '2026-01-04',
    language: 'vi',
  },
}

// Hàm tạo dữ liệu XSMB ngẫu nhiên
export const generateRandomXSMB = () => {
  const generateNumber = (length) => {
    return Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, '0')
  }

  const today = new Date()
  const formattedDate = `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()}`

  return {
    countNumbers: 27,
    time: formattedDate,
    results: {
      ĐB: [generateNumber(5)],
      G1: [generateNumber(5)],
      G2: [generateNumber(5), generateNumber(5)],
      G3: Array(6)
        .fill(0)
        .map(() => generateNumber(5)),
      G4: Array(4)
        .fill(0)
        .map(() => generateNumber(4)),
      G5: Array(6)
        .fill(0)
        .map(() => generateNumber(4)),
      G6: Array(3)
        .fill(0)
        .map(() => generateNumber(3)),
      G7: Array(4)
        .fill(0)
        .map(() => generateNumber(2)),
    },
  }
}

// Mock data cho danh sách bạn bè referral
export const mockReferralFriends = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    avatar: '👤',
    coinsEarned: 150,
    joinedDate: '2024-01-15',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    avatar: '👩',
    coinsEarned: 280,
    joinedDate: '2024-01-20',
  },
  {
    id: 3,
    name: 'Lê Minh C',
    avatar: '👨',
    coinsEarned: 95,
    joinedDate: '2024-01-25',
  },
  {
    id: 4,
    name: 'Phạm Thu D',
    avatar: '👧',
    coinsEarned: 420,
    joinedDate: '2024-02-01',
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    avatar: '🧑',
    coinsEarned: 180,
    joinedDate: '2024-02-10',
  },
]

// Mock data cho lịch sử rút tiền
export const mockWithdrawalHistory = {
  ok: true,
  data: [
    {
      id: 1,
      user_id: 123456,
      amount: 500000,
      status: 'pending',
      bank_name: 'MB Bank',
      created_at: '2024-05-24 10:30:00',
      updated_at: null,
    },
    {
      id: 2,
      user_id: 123456,
      amount: 2000000,
      status: 'paid',
      bank_name: 'Vietcombank',
      created_at: '2024-05-20 14:15:00',
      updated_at: '2024-05-20 14:45:00',
    },
    {
      id: 3,
      user_id: 123456,
      amount: 1500000,
      status: 'paid',
      bank_name: 'Vietcombank',
      created_at: '2024-05-18 09:00:00',
      updated_at: '2024-05-18 09:30:00',
    },
    {
      id: 4,
      user_id: 123456,
      amount: 1000000,
      status: 'cancelled',
      bank_name: 'Techcombank',
      created_at: '2024-05-15 18:45:00',
      updated_at: '2024-05-15 19:00:00',
    },
    {
      id: 5,
      user_id: 123456,
      amount: 300000,
      status: 'paid',
      bank_name: 'MB Bank',
      created_at: '2024-05-10 11:20:00',
      updated_at: '2024-05-10 11:50:00',
    },
    {
      id: 6,
      user_id: 123456,
      amount: 100000,
      status: 'paid',
      bank_name: 'MB Bank',
      created_at: '2024-05-05 08:15:00',
      updated_at: '2024-05-05 08:45:00',
    },
  ],
  total: 6,
}
