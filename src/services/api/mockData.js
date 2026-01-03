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
  id: '123456789',
  firstName: 'Nguyễn',
  lastName: 'Văn A',
  username: 'nguyenvana',
  photoUrl: 'https://via.placeholder.com/150',
  languageCode: 'vi',
  isPremium: false,
  balance: 1000000,
  createdAt: '2025-01-01T00:00:00Z',
  lastLogin: '2026-01-03T10:30:00Z',
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
