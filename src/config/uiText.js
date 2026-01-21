/**
 * Cấu hình toàn bộ văn bản hiển thị trên UI (User Interface).
 * Giúp quản lý tập trung, dễ dàng chỉnh sửa hoặc dịch thuật sau này.
 */
import { telegramAuthService } from '../services/telegram/telegramAuthService'

const VI_TEXT = {
  // Các văn bản dùng chung toàn app
  common: {
    appName: 'XSMB Mini App',
    loading: 'Đang tải dữ liệu...',
    error: 'Có lỗi xảy ra, vui lòng thử lại.',
    success: 'Thành công!',
    confirm: 'Xác nhận',
    cancel: 'Hủy bỏ',
    back: 'Quay lại',
    save: 'Lưu thay đổi',
    continue: 'Tiếp tục',
    close: 'Đóng',
    copy: 'Sao chép',
    copied: 'Đã sao chép!',
    currency: 'Coins',
    delete: 'Xóa',
    today: 'Hôm nay',
    history: 'Lịch sử',
  },

  // Màn hình Trang chủ (Home)
  home: {
    title: 'Dự Đoán XSMB',
    lotteryName: 'Xổ số Miền Bắc',
    predictionInput: {
      label: 'Nhập số dự đoán của bạn (00-99)',
      placeholder: 'VD: 68',
      button: 'Gửi dự đoán',
      helperText: 'Kết quả sẽ có vào lúc 18:30 hàng ngày.',
    },
    prediction: {
      title: 'Dự đoán kết quả',
      history: 'Lịch sử dự đoán hôm nay',
      inputLabel: 'Nhập số dự đoán',
      placeholder: '00',
      sendButton: 'Gửi dự đoán ngay',
      sending: 'Đang gửi...',
      outOfTurns: 'Đã hết {max} lượt dự đoán hôm nay',
      remaining: 'Còn {count}',
      predicted: 'Đã dự đoán {count}/{max}',
      resultTime: 'Kết quả sẽ được công bố vào 11:15 UTC hàng ngày',
      resultTime: 'Kết quả sẽ được công bố vào 11:15 UTC hàng ngày',
      updateTime: 'Kết quả được cập nhật trực tiếp lúc 11:15 UTC hàng ngày',
      waitingResults: 'Đang chờ kết quả (11:15 UTC)',
    addTitle: 'Thêm {title}',
    inputLabel: 'Nhập số dự đoán ({digits} số)',
    confirmDelete: 'Bạn có chắc chắn muốn xóa số này?',
    deleteTitle: 'Xóa dự đoán',
    alreadyPredicted: 'Số này đã được dự đoán',
    limitReached: 'Đã đạt giới hạn dự đoán',
    connectionError: 'Lỗi kết nối',
    deleteError: 'Không thể xóa dự đoán',
    rule_db_2: '2 số cuối giải đặc biệt',
    rule_loto_2: '2 số cuối các giải',
    rule_db_3: '3 số cuối giải đặc biệt',
    rule_loto_3: '3 số cuối các giải',
    title_db_2: 'ĐB 2 SỐ',
    title_loto_2: 'LÔ TÔ 2 SỐ',
    title_db_3: 'ĐB 3 SỐ',
    title_loto_3: 'LÔ TÔ 3 SỐ',
    noTicket: 'Bạn không đủ vé để thực hiện dự đoán này.',
    ticketError: 'Lỗi khi sử dụng vé. Vui lòng thử lại.',
    freeTab: 'Dự đoán miễn phí',
    ticketTab: 'Dự đoán bằng vé',
    totalPredictions: 'Dự đoán hôm nay: {total}'
  },

  // Màn hình Tài khoản (Account)
  account: {
    title: 'Tài Khoản',
    balance: {
      label: 'Số dư Xu',
      points: 'Vé',
      unit: 'Coins',
    },
    actions: {
      withdraw: 'Rút tiền',
      history: 'Lịch sử',
      settings: 'Cài đặt',
      deposit: 'Nạp xu',
    },
    topUp: {
      title: 'Nạp thêm vé',
      description: 'Chuyển khoản với nội dung là ID của bạn để nạp thêm vé. Tỷ giá: $1 = 1 vé.',
      paypal: 'Chuyển qua PayPal',
      crypto: 'Crypto (USDT - TON Network)',
      copyId: 'Sao chép ID',
      idLabel: 'Nội dung chuyển khoản (ID)',
      paypalEmail: 'tuananh260501@gmail.com',
      cryptoWallet: 'Ví Crypto (TON)',
      cryptoAddress: 'UQBquk4W9IKNUjF-8WSFarra_er2nfyuUnJ0qlj64WQAtRHf',
      topUpButton: 'Nạp thêm',
      convertButton: 'Đổi vé',
      convertTitle: 'Đổi Coins lấy vé',
      convertLabel: 'Số lượng vé muốn đổi',
      convertRate: 'Tỷ giá: {coins} Coins = 1 vé',
      convertTotal: 'Tổng cộng: {coins} Coins',
      convertConfirm: 'Xác nhận đổi {coins} Coins lấy {tickets} vé?',
      convertSuccess: 'Đổi vé thành công!',
      insufficientCoins: 'Số dư không đủ để đổi vé (Cần {coins} Coins)',
    },
    profile: {
      uid: 'ID',
      joinDate: 'Ngày tham gia',
    },
    messages: {
      featureDev: 'Tính năng nạp xu đang phát triển',
      contactSupport: 'Liên hệ: @crush_xx',
      updateSuccess: 'Cập nhật thành công!',
    },
    settings: {
      general: 'Cài đặt chung',
      bankAccount: 'Tài khoản ngân hàng',
      bankDesc: 'Liên kết để rút tiền',
      support: 'Hỗ trợ khách hàng',
    },
  },

  // Màn hình Rút tiền (Withdrawal)
  withdrawal: {
    title: 'Yêu cầu rút tiền',
    amountInput: {
      label: 'Số tiền muốn rút',
      placeholder: 'Tối thiểu 50.000đ',
    },
    bankInfo: {
      title: 'Thông tin nhận tiền',
      bankName: 'Ngân hàng',
      accountNumber: 'Số tài khoản',
      accountName: 'Tên chủ tài khoản',
      note: 'Vui lòng kiểm tra kỹ thông tin trước khi xác nhận.',
    },
    crypto: {
      title: 'Rút tiền Crypto',
      selectCrypto: 'Chọn loại tiền điện tử',
      walletAddress: 'Địa chỉ ví',
      placeholderAddress: 'Nhập địa chỉ ví của bạn',
      amount: 'Số tiền rút',
      confirm: 'Xác nhận rút tiền Crypto',
      note: 'Vui lòng kiểm tra kỹ địa chỉ ví trước khi xác nhận.',
      cryptoType: 'Loại tiền điện tử',
      walletAddressLabel: 'Địa chỉ ví nhận',
    },
    history: {
      title: 'Lịch sử Rút tiền',
      empty: 'Chưa có giao dịch nào.',
      showing: 'Hiển thị {count}/{total} giao dịch',
      withdrawTo: 'Rút về {bank}',
      status: {
        pending: 'Đang xử lý',
        approved: 'Thành công',
        paid: 'Thành công',
        success: 'Thành công',
        rejected: 'Đã hủy/Từ chối',
        canceled: 'Đã hủy',
      },
    },
    warning: {
      noBank: 'Chưa cài đặt Tài khoản Rút tiền',
      setupFirst:
        'Bạn chưa cài đặt tài khoản ngân hàng để rút tiền. Vui lòng cài đặt trước khi thực hiện giao dịch.',
      setupNow: 'Cài đặt ngay',
    },
    modal: {
      confirmTitle: 'Xác nhận rút tiền',
      confirmMessage:
        'Bạn có chắc chắn muốn rút số tiền này về tài khoản đã chọn?',
      fee: 'Phí giao dịch',
      free: 'Miễn phí',
      realReceived: 'Thực nhận',
      note: 'Yêu cầu của bạn sẽ được xử lý trong 5-15 phút. Vui lòng kiểm tra kỹ thông tin tài khoản nhận tiền trước khi xác nhận.',
    },
    messages: {
      requestSent: 'Yêu cầu rút tiền đã được gửi!',
    },
  },

  // Màn hình Cài đặt & Mời bạn bè (Settings)
  settings: {
    title: 'Cài đặt & Giới thiệu',
    header: {
      title: 'Xây dựng team của bạn!',
      subtitle: 'Giới thiệu bạn bè và nhận thưởng.',
    },
    invite: {
      title: 'Xây dựng team của bạn!',
      subtitle: 'Giới thiệu bạn bè và nhận thưởng.',
      cardTitle: 'Mời bạn bè',
      description:
        'Nhận 1,000đ cho mỗi người bạn mời và tham gia dự đoán thành công.',
      button: 'Mời bạn bè',
      refLink: 'Link giới thiệu của bạn',
      shareText: 'Tham gia cùng tôi nào! 🎰',
      statsTitle: 'Thống kê giới thiệu',
      totalRef: 'Tổng số lượt giới thiệu',
      estimatedEarnings: 'Thu nhập ước tính',
      pending: 'Đang chờ xử lý',
    },

    friends: {
      title: 'Bạn bè',
      total: '{count} người',
      loading: 'Đang tải danh sách...',
      empty: 'Chưa có ai tham gia.',
      joined: 'Tham gia {date}',
      name: 'Tên',
      statusLabel: 'Trạng thái',
      income: 'Thu nhập',
      noMore: 'Không có lượt giới thiệu nào nữa để hiển thị.',
      status: {
        rewarded: 'Đã nhận thưởng',
        pending: 'Đang chờ',
      },
    },
  },

  // Navigation
  navigation: {
    home: 'Trang chủ',
    account: 'Tài khoản',
    invite: 'Mời bạn bè',
    ariaLabel: 'Điều hướng chính',
  },

  // Error Boundary
  errorBoundary: {
    title: 'Có lỗi xảy ra',
    message: 'Ứng dụng gặp sự cố không mong muốn. Vui lòng thử lại sau.',
    reload: 'Tải lại trang',
  },

  // Các thông báo lỗi (Validation/Errors)

  validation: {
    required: 'Vui lòng không bỏ trống.',
    invalidNumber: 'Vui lòng nhập số hợp lệ.',
    minAmount: 'Số tiền rút tối thiểu là {amount}',
    maxAmount: 'Số dư không đủ.',
    invalidBank: 'Thông tin ngân hàng không hợp lệ.',
    guessTimeOver: 'Đã hết thời gian dự đoán (sau 18:00).',
    alreadyGuessed: 'Bạn đã dự đoán hôm nay rồi.',
  },
}

const EN_TEXT = {
  // Common texts
  common: {
    appName: 'XSMB Mini App',
    loading: 'Loading data...',
    error: 'An error occurred, please try again.',
    success: 'Success!',
    confirm: 'Confirm',
    cancel: 'Cancel',
    back: 'Back',
    save: 'Save changes',
    continue: 'Continue',
    close: 'Close',
    copy: 'Copy',
    copied: 'Copied!',
    currency: 'Coins',
    delete: 'Delete',
    today: 'Today',
    history: 'History',
  },

  // Home Screen
  home: {
    title: 'XSMB Prediction',
    lotteryName: 'Northern Lottery',
    predictionInput: {
      label: 'Enter your prediction (00-99)',
      placeholder: 'Ex: 68',
      button: 'Submit Prediction',
      helperText: 'Results available at 18:30 daily.',
    },
    prediction: {
      title: 'Result Prediction',
      history: 'Prediction History Today',
      inputLabel: 'Enter prediction number',
      placeholder: '00',
      sendButton: 'Submit Prediction Now',
      sending: 'Sending...',
      outOfTurns: 'Used {max} predictions today',
      remaining: 'Remaining {count}',
      predicted: 'Predicted {count}/{max}',
      resultTime: 'Results announced at 11:15 UTC daily',
      updateTime: 'Results updated live at 11:15 UTC daily',
      waitingResults: 'Waiting for results (11:15 UTC)',
    addTitle: 'Add {title}',
    inputLabel: 'Enter prediction number ({digits} digits)',
    confirmDelete: 'Are you sure you want to delete this number?',
    deleteTitle: 'Delete Prediction',
    alreadyPredicted: 'This number has already been predicted',
    limitReached: 'Prediction limit reached',
    connectionError: 'Connection error',
    deleteError: 'Cannot delete prediction',
    rule_db_2: 'match 2 digits of special prize',
    rule_loto_2: 'match 2 digits of any prizes',
    rule_db_3: 'match 3 digits of special prize',
    rule_loto_3: 'match 3 digits of any prizes',
    title_db_2: 'SPECIAL LAST 2 DIGITS',
    title_loto_2: 'LOTO LAST 2 DIGITS',
    title_db_3: 'SPECIAL LAST 3 DIGITS',
    title_loto_3: 'LOTO LAST 3 DIGITS',
    noTicket: 'You do not have enough tickets for this prediction.',
    ticketError: 'Error using ticket. Please try again.',
    freeTab: 'Free Prediction',
    ticketTab: 'Ticket Prediction',
    totalPredictions: 'Total predictions: {total}'
  },

  // Account Screen
  account: {
    title: 'Account',
    balance: {
      label: 'Coin Balance',
      points: 'Tickets',
      unit: 'Coins',
    },
    actions: {
      withdraw: 'Withdraw',
      history: 'History',
      settings: 'Settings',
      deposit: 'Deposit Coins',
    },
    topUp: {
      title: 'Top up Tickets',
      description: 'Transfer with your ID as content to top up tickets. Rate: $1 = 1 ticket.',
      paypal: 'Transfer via PayPal',
      crypto: 'Crypto (USDT - TON Network)',
      copyId: 'Copy ID',
      idLabel: 'Transfer Content (ID)',
      paypalEmail: 'tuananh260501@gmail.com',
      cryptoWallet: 'Crypto Wallet (TON)',
      cryptoAddress: 'UQBquk4W9IKNUjF-8WSFarra_er2nfyuUnJ0qlj64WQAtRHf',
      topUpButton: 'Top up',
      convertButton: 'Convert',
      convertTitle: 'Convert Coins to Tickets',
      convertLabel: 'Number of tickets to convert',
      convertRate: 'Rate: {coins} Coins = 1 ticket',
      convertTotal: 'Total: {coins} Coins',
      convertConfirm: 'Confirm converting {coins} Coins for {tickets} tickets?',
      convertSuccess: 'Conversion successful!',
      insufficientCoins: 'Insufficient balance (Need {coins} Coins)',
    },
    profile: {
      uid: 'ID',
      joinDate: 'Join Date',
    },
    messages: {
      featureDev: 'Deposit feature is under development',
      contactSupport: 'Contact: @crush_xx',
      updateSuccess: 'Update successful!',
    },
    settings: {
      general: 'General Settings',
      bankAccount: 'Bank Account',
      bankDesc: 'Link to withdraw money',
      support: 'Customer Support',
    },
  },

  // Withdrawal Screen
  withdrawal: {
    title: 'Withdrawal Request',
    amountInput: {
      label: 'Amount to withdraw',
      placeholder: 'Minimum 50,000đ',
    },
    bankInfo: {
      title: 'Recipient Info',
      bankName: 'Bank',
      accountNumber: 'Account Number',
      accountName: 'Account Holder Name',
      note: 'Please check info carefully before confirming.',
    },
    crypto: {
      title: 'Withdraw Crypto',
      selectCrypto: 'Select Cryptocurrency',
      walletAddress: 'Wallet Address',
      placeholderAddress: 'Enter your wallet address',
      amount: 'Withdrawal Amount',
      confirm: 'Confirm Crypto Withdrawal',
      note: 'Please check wallet address carefully before confirming.',
      cryptoType: 'Cryptocurrency Type',
      walletAddressLabel: 'Recipient Wallet Address',
    },
    history: {
      title: 'Withdrawal History',
      empty: 'No transactions yet.',
      showing: 'Showing {count}/{total} transactions',
      withdrawTo: 'Withdraw to {bank}',
      status: {
        pending: 'Pending',
        approved: 'Success',
        paid: 'Success',
        success: 'Success',
        rejected: 'Cancelled/Rejected',
        canceled: 'Cancelled',
      },
    },
    warning: {
      noBank: 'Withdrawal Account not set',
      setupFirst:
        'You have not set up a bank account for withdrawal. Please set up before transacting.',
      setupNow: 'Set up now',
    },
    modal: {
      confirmTitle: 'Confirm Withdrawal',
      confirmMessage:
        'Are you sure you want to withdraw this amount to the selected account?',
      fee: 'Transaction Fee',
      free: 'Free',
      realReceived: 'Actual Received',
      note: 'Your request will be processed in 5-15 minutes. Please check recipient account info carefully before confirming.',
    },
    messages: {
      requestSent: 'Withdrawal request sent!',
    },
  },

  // Settings & Referral Screen
  settings: {
    title: 'Settings & Referral',
    header: {
      title: 'Build your team!',
      subtitle: 'Refer friends and get rewards.',
    },
    invite: {
      title: 'Build your team!',
      subtitle: 'Refer friends and get rewards.',
      cardTitle: 'Invite Friends',
      description:
        'Get 1,000đ for each friend you invite who successfully joins prediction.',
      button: 'Invite Friends',
      refLink: 'Your Referral Link',
      shareText: 'Join me now! 🎰',
      statsTitle: 'Referral Statistics',
      totalRef: 'Total Referrals',
      estimatedEarnings: 'Estimated Earnings',
      pending: 'Pending',
    },

    friends: {
      title: 'Friends',
      total: '{count} people',
      loading: 'Loading list...',
      empty: 'No one has joined yet.',
      joined: 'Joined {date}',
      name: 'Name',
      statusLabel: 'Status',
      income: 'Income',
      noMore: 'No more referrals to show.',
      status: {
        rewarded: 'Rewarded',
        pending: 'Pending',
      },
    },
  },

  // Navigation
  navigation: {
    home: 'Home',
    account: 'Account',
    invite: 'Invite',
    ariaLabel: 'Main Navigation',
  },

  // Error Boundary
  errorBoundary: {
    title: 'An error occurred',
    message:
      'The application encountered an unexpected error. Please try again later.',
    reload: 'Reload Page',
  },

  // Validation/Errors
  validation: {
    required: 'Please do not leave empty.',
    invalidNumber: 'Please enter a valid number.',
    minAmount: 'Minimum withdrawal amount is {amount}',
    maxAmount: 'Insufficient balance.',
    invalidBank: 'Invalid bank information.',
    guessTimeOver: 'Prediction time is over (after 18:00).',
    alreadyGuessed: 'You have already predicted today.',
  },
}

const getLanguage = () => {
  try {
    // 1. Try to get from cached validation data
    const validationData = telegramAuthService.getCachedValidation()
    const validLang =
      validationData?.data?.user?.language_code ||
      validationData?.user?.language_code

    if (validLang) return validLang

    // 2. Try to get from unsafe init data (global)
    const unsafeLang =
      window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code
    if (unsafeLang) return unsafeLang

    return 'en' // Default
  } catch {
    return 'en'
  }
}

const lang = getLanguage()
export const UI_TEXT = lang === 'vi' ? VI_TEXT : EN_TEXT

export default UI_TEXT
