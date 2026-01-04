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
export const mockWithdrawalHistory = [
  {
    id: 1,
    bankName: 'MB Bank',
    amount: 500000,
    date: '10:30, 24/05/2024',
    status: 'pending',
  },
  {
    id: 2,
    bankName: 'Vietcombank',
    amount: 2000000,
    date: '14:15, 20/05/2024',
    status: 'success',
  },
  {
    id: 3,
    bankName: 'Vietcombank',
    amount: 1500000,
    date: '09:00, 18/05/2024',
    status: 'success',
  },
  {
    id: 4,
    bankName: 'Techcombank',
    amount: 1000000,
    date: '18:45, 15/05/2024',
    status: 'cancelled',
  },
  {
    id: 5,
    bankName: 'MB Bank',
    amount: 300000,
    date: '11:20, 10/05/2024',
    status: 'success',
  },
  {
    id: 6,
    bankName: 'MB Bank',
    amount: 100000,
    date: '08:15, 05/05/2024',
    status: 'success',
  },
]
