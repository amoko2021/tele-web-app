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
      resultTime: 'Kết quả sẽ được công bố vào 18:15 hàng ngày',
      addNew: 'Thêm dự đoán mới',
      check: 'Đang kiểm tra...',
      join: 'Tham gia dự đoán',
      predict: 'Dự đoán',
      view: 'Xem',
      selectPrize: 'Chọn loại giải',
    },
    prizeSection: {
      title: 'Giải Thưởng',
      specialPrize: 'Giải Đặc Biệt',
      lotoPrize: 'Giải Lô Tô',
      specialPrizeShort: 'Giải ĐB',
      lotoPrizeShort: 'Lô tô',
    },
    results: {
      updateTime: 'Kết quả được cập nhật trực tiếp lúc 18:15 hàng ngày',
      prize: 'Giải',
      result: 'Kết quả',
      updating: 'Đang cập nhật',
    },
    tasks: {
      title: 'Nhiệm vụ hàng ngày',
      checkIn: 'Điểm danh hàng ngày',
      joinChannel: 'Tham gia kênh thông báo',
      survey: 'Khảo sát kiếm tiền',
      join: 'Tham gia',
      watchAds: 'Xem quảng cáo {adType}',
    },
    alerts: {
      rewardReceived: 'Bạn đã nhận được phần thưởng!',
      taskError: 'Có lỗi xảy ra khi thực hiện nhiệm vụ. Vui lòng thử lại!',
      noTask: 'Hiện không có nhiệm vụ nào. Vui lòng thử lại sau!',
      sessionTimeout:
        'Phiên làm việc quá lâu. Vui lòng khởi động lại ứng dụng!',
      noUser: 'Không tìm thấy thông tin user!',
      predictionRecorded: 'Dự đoán của bạn đã được ghi nhận!',
      adUnavailable:
        'Quảng cáo hiện không khả dụng. Vui lòng đợi hoặc tải lại trang!!!',
      adLoading: 'Đang tải quảng cáo...',
      adError: 'Có lỗi khi hiển thị quảng cáo. Vui lòng thử lại!',
      monetagFallback:
        'Quảng cáo Monetag chưa sẵn sàng, đang chuyển sang nguồn dự phòng...',
      monetagError: 'Lỗi khi tải quảng cáo Monetag, đang thử nguồn dự phòng...',
      rewardFromAd: 'Bạn đã nhận được {amount} Coins khi xem quảng cáo!',
      rewardUpdateError:
        'Bạn đã nhận được {amount} Coins nhưng có lỗi khi cập nhật số dư!',
      adCooldown: 'Vui lòng đợi {seconds}s để xem quảng cáo tiếp theo',
    },
    rules: {
      title: 'Thể lệ chương trình',
      limit: 'Mỗi hạng mục được phép dự đoán tối đa 10 bộ số.',
      view: 'Xem thể lệ chương trình',
      timeTitle: '1. Thời gian dự đoán',
      timeContent: 'Hệ thống mở cổng dự đoán từ {start} đến {end} hàng ngày.',
      ruleTitle: '2. Quy định tham gia',
      ruleContent1:
        'Mỗi lượt dự đoán bạn cần xem 1 quảng cáo ngắn để ủng hộ hệ thống.',
      ruleContent2: 'Mỗi hạng mục được phép dự đoán tối đa 10 bộ số.',
      ruleContent3: 'Bạn sẽ nhận được phần thưởng nếu dự đoán của bạn trùng khớp với giải thưởng hôm nay.',
      ruleContent4: 'Ví dụ: trong trò chơi "Đặc biệt 2 chữ số", nếu bạn đoán là 25, bạn sẽ nhận được phần thưởng khi giải thưởng đặc biệt hôm nay có 2 chữ số cuối là 25 (Giải thưởng đặc biệt: xxx25)',
      ruleContent5: 'Trong hạng mục xổ số Loto, nếu bạn đoán đúng số 25, bạn sẽ nhận được phần thưởng nếu hai chữ số cuối cùng của các giải thưởng hôm nay trùng khớp với dự đoán của bạn.',
      prizeTitle: '3. Cơ cấu giải thưởng',
      prizeSpecial2: 'Đặc biệt 2 số: +15k Coins',
      prizeLoto2: 'Lô 2 số: +3k Coins',
      prizeSpecial3: 'Đặc biệt 3 số: +50K Coins',
      prizeLoto3: 'Lô 3 số: +10K Coins',
      understood: 'Đã hiểu',
    },
  },

  // Màn hình Dự đoán (Prediction)
  prediction: {
    title: 'Dự đoán hôm nay',
    loadingError: 'Không thể tải dữ liệu dự đoán',
    timeOver:
      'Thời gian dự đoán kết thúc. Nhấn vào biểu tượng quảng cáo để nhận 10-100 Coins',
    waitingResults: 'Đang chờ kết quả (18:15)',
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
      resultTime: 'Results announced at 18:15 daily',
      addNew: 'Add New Prediction',
      check: 'Checking...',
      join: 'Join Prediction',
      predict: 'Predict',
      view: 'View',
      selectPrize: 'Select Prize Type',
    },
    prizeSection: {
      title: 'Prizes',
      specialPrize: 'Special Prize',
      lotoPrize: 'Loto Prize',
      specialPrizeShort: 'Special',
      lotoPrizeShort: 'Loto',
    },
    results: {
      updateTime: 'Results updated live at 18:15 daily',
      prize: 'Prize',
      result: 'Result',
      updating: 'Updating',
    },
    tasks: {
      title: 'Daily Tasks',
      checkIn: 'Daily Check-in',
      joinChannel: 'Join Notification Channel',
      survey: 'Earn Money Survey',
      join: 'Join',
      watchAds: 'Watch Ads {adType}',
    },
    alerts: {
      rewardReceived: 'You received a reward!',
      taskError: 'Error performing task. Please try again!',
      noTask: 'No tasks available. Please try again later!',
      sessionTimeout: 'Session timeout. Please restart the app!',
      noUser: 'User info not found!',
      predictionRecorded: 'Your prediction has been recorded!',
      adUnavailable: 'Ads currently unavailable. Please wait or reload!!!',
      adLoading: 'Loading ads...',
      adError: 'Error showing ads. Please try again!',
      monetagFallback: 'Monetag ads not ready, switching to backup...',
      monetagError: 'Error loading Monetag ads, trying backup...',
      rewardFromAd: 'You received {amount} Coins for watching ads!',
      rewardUpdateError:
        'You received {amount} Coins but error updating balance!',
      adCooldown: 'Please wait {seconds}s to watch the next ad',
    },
    rules: {
      title: 'Program Rules',
      limit: 'Max 10 number sets per category.',
      view: 'View Program Rules',
      timeTitle: '1. Prediction Time',
      timeContent: 'System opens for prediction from {start} to {end} daily.',
      ruleTitle: '2. Participation Rules',
      ruleContent1:
        'Each prediction requires watching 1 short ad to support the system.',
      ruleContent2: 'Max 10 number sets per category.',
      ruleContent3: 'You will rewarded if your prediction same as today prizes.',
      ruleContent4: 'For example: in Special 2 digits, if you have guess 25, you will rewarded when special prize today have 25 in 2 last digits (Special prize : xxx25)',
      ruleContent5: 'In Loto category, if you guess number 25, you will rewarded if any last 2 digits prizes of today have match with your predict',
      prizeTitle: '3. Prize Structure',
      prizeSpecial2: 'Special 2 digits: +15k Coins',
      prizeLoto2: 'Loto 2 digits: +3k Coins',
      prizeSpecial3: 'Special 3 digits: +50K Coins',
      prizeLoto3: 'Loto 3 digits: +10K Coins',
      understood: 'Understood',
    },
  },

  // Prediction Screen
  prediction: {
    title: 'Prediction Today',
    loadingError: 'Cannot load prediction data',
    timeOver: 'Prediction time over. Click ad icon to receive 10-100 Coins',
    waitingResults: 'Waiting for results (18:15)',
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
