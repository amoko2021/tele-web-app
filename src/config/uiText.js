/**
 * Cấu hình toàn bộ văn bản hiển thị trên UI (User Interface).
 * Giúp quản lý tập trung, dễ dàng chỉnh sửa hoặc dịch thuật sau này.
 */

export const UI_TEXT = {
  // Các văn bản dùng chung toàn app
  common: {
    appName: "XSMB Mini App",
    loading: "Đang tải dữ liệu...",
    error: "Có lỗi xảy ra, vui lòng thử lại.",
    success: "Thành công!",
    confirm: "Xác nhận",
    cancel: "Hủy bỏ",
    back: "Quay lại",
    save: "Lưu thay đổi",
    continue: "Tiếp tục",
    close: "Đóng",
    copy: "Sao chép",
    copied: "Đã sao chép!",
    currency: "VND",
    delete: "Xóa",
    today: "Hôm nay",
    history: "Lịch sử",
  },

  // Màn hình Trang chủ (Home)
  home: {
    title: "Dự Đoán XSMB",
    lotteryName: "Xổ số Miền Bắc",
    predictionInput: {
      label: "Nhập số dự đoán của bạn (00-99)",
      placeholder: "VD: 68",
      button: "Gửi dự đoán",
      helperText: "Kết quả sẽ có vào lúc 18:30 hàng ngày.",
    },
    prediction: {
      title: "Dự đoán kết quả",
      history: "Lịch sử dự đoán hôm nay",
      inputLabel: "Nhập số dự đoán",
      placeholder: "00",
      sendButton: "Gửi dự đoán ngay",
      sending: "Đang gửi...",
      outOfTurns: "Đã hết {max} lượt dự đoán hôm nay",
      remaining: "Còn {count}",
      predicted: "Đã dự đoán {count}/{max}",
      resultTime: "Kết quả sẽ được công bố vào 18:15 hàng ngày",
      addNew: "Thêm dự đoán mới",
      check: "Đang kiểm tra...",
      join: "Tham gia dự đoán",
      predict: "Dự đoán",
      view: "Xem",
      selectPrize: "Chọn loại giải",
    },
    prizeSection: {
      title: "Giải Thưởng",
      specialPrize: "Giải Đặc Biệt",
      lotoPrize: "Giải Lô Tô",
      specialPrizeShort: "Giải ĐB",
      lotoPrizeShort: "Lô tô",
    },
    results: {
      updateTime: "Kết quả được cập nhật trực tiếp lúc 18:15 hàng ngày",
      prize: "Giải",
      result: "Kết quả",
      updating: "Đang cập nhật",
    },
    tasks: {
      title: "Nhiệm vụ hàng ngày",
      checkIn: "Điểm danh hàng ngày",
      joinChannel: "Tham gia kênh thông báo",
      survey: "Khảo sát kiếm tiền",
      join: "Tham gia",
      watchAds: "Xem quảng cáo {adType}",
    },
    alerts: {
      rewardReceived: "Bạn đã nhận được phần thưởng!",
      taskError: "Có lỗi xảy ra khi thực hiện nhiệm vụ. Vui lòng thử lại!",
      noTask: "Hiện không có nhiệm vụ nào. Vui lòng thử lại sau!",
      sessionTimeout: "Phiên làm việc quá lâu. Vui lòng khởi động lại ứng dụng!",
      noUser: "Không tìm thấy thông tin user!",
      predictionRecorded: "Dự đoán của bạn đã được ghi nhận!",
      adUnavailable: "Quảng cáo hiện không khả dụng. Vui lòng đợi hoặc tải lại trang!!!",
      adLoading: "Đang tải quảng cáo...",
      adError: "Có lỗi khi hiển thị quảng cáo. Vui lòng thử lại!",
      monetagFallback: "Quảng cáo Monetag chưa sẵn sàng, đang chuyển sang nguồn dự phòng...",
      monetagError: "Lỗi khi tải quảng cáo Monetag, đang thử nguồn dự phòng...",
      rewardFromAd: "Bạn đã nhận được {amount}đ khi xem quảng cáo!",
      rewardUpdateError: "Bạn đã nhận được {amount}đ nhưng có lỗi khi cập nhật số dư!",
    },
    rules: {
      title: "Thể lệ chương trình",
      limit: "Mỗi hạng mục được phép dự đoán tối đa 10 bộ số.",
      view: "Xem thể lệ chương trình",
      timeTitle: "1. Thời gian dự đoán",
      timeContent: "Hệ thống mở cổng dự đoán từ {start} đến {end} hàng ngày.",
      ruleTitle: "2. Quy định tham gia",
      ruleContent1: "Mỗi lượt dự đoán bạn cần xem 1 quảng cáo ngắn để ủng hộ hệ thống.",
      ruleContent2: "Mỗi hạng mục được phép dự đoán tối đa 10 bộ số.",
      prizeTitle: "3. Cơ cấu giải thưởng",
      prizeSpecial2: "Đặc biệt 2 số: +15k",
      prizeLoto2: "Lô 2 số: 3k",
      prizeSpecial3: "Đặc biệt 3 số: +50K",
      prizeLoto3: "Lô 3 số: +10K",
      understood: "Đã hiểu",
    }
  },

  // Màn hình Dự đoán (Prediction)
  prediction: {
    title: "Dự đoán hôm nay",
    loadingError: "Không thể tải dữ liệu dự đoán",
    timeOver: "Thời gian dự đoán kết thúc. Nhấn vào biểu tượng quảng cáo để nhận 10-100đ",
    waitingResults: "Đang chờ kết quả (18:15)",
    addTitle: "Thêm {title}",
    inputLabel: "Nhập số dự đoán ({digits} số)",
    confirmDelete: "Bạn có chắc chắn muốn xóa số này?",
    deleteTitle: "Xóa dự đoán",
    alreadyPredicted: "Số này đã được dự đoán",
    limitReached: "Đã đạt giới hạn dự đoán",
    connectionError: "Lỗi kết nối",
    deleteError: "Không thể xóa dự đoán",
  },

  // Màn hình Tài khoản (Account)
  account: {
    title: "Tài Khoản",
    balance: {
      label: "Số dư Xu",
      points: "Điểm thưởng",
      unit: "đ",
    },
    actions: {
      withdraw: "Rút tiền",
      history: "Lịch sử",
      settings: "Cài đặt",
      deposit: "Nạp xu",
    },
    profile: {
      uid: "ID",
      joinDate: "Ngày tham gia",
    },
    messages: {
      featureDev: "Tính năng nạp xu đang phát triển",
      contactSupport: "Liên hệ: @crush_xx",
      updateSuccess: "Cập nhật thành công!",
    },
    settings: {
      general: "Cài đặt chung",
      bankAccount: "Tài khoản ngân hàng",
      bankDesc: "Liên kết để rút tiền",
      support: "Hỗ trợ khách hàng",
    }
  },

  // Màn hình Rút tiền (Withdrawal)
  withdrawal: {
    title: "Yêu cầu rút tiền",
    amountInput: {
      label: "Số tiền muốn rút",
      placeholder: "Tối thiểu 50.000đ",
    },
    bankInfo: {
      title: "Thông tin nhận tiền",
      bankName: "Ngân hàng",
      accountNumber: "Số tài khoản",
      accountName: "Tên chủ tài khoản",
      note: "Vui lòng kiểm tra kỹ thông tin trước khi xác nhận.",
    },
    history: {
      title: "Lịch sử Rút tiền",
      empty: "Chưa có giao dịch nào.",
      showing: "Hiển thị {count}/{total} giao dịch",
      withdrawTo: "Rút về {bank}",
      status: {
        pending: "Đang xử lý",
        approved: "Thành công",
        paid: "Thành công",
        success: "Thành công",
        rejected: "Đã hủy/Từ chối",
        canceled: "Đã hủy",
      }
    },
    warning: {
      noBank: "Chưa cài đặt Tài khoản Rút tiền",
      setupFirst: "Bạn chưa cài đặt tài khoản ngân hàng để rút tiền. Vui lòng cài đặt trước khi thực hiện giao dịch.",
      setupNow: "Cài đặt ngay",
    },
    modal: {
      confirmTitle: "Xác nhận rút tiền",
      confirmMessage: "Bạn có chắc chắn muốn rút số tiền này về tài khoản đã chọn?",
      fee: "Phí giao dịch",
      free: "Miễn phí",
      realReceived: "Thực nhận",
      note: "Yêu cầu của bạn sẽ được xử lý trong 5-15 phút. Vui lòng kiểm tra kỹ thông tin tài khoản nhận tiền trước khi xác nhận.",
    },
    messages: {
      requestSent: "Yêu cầu rút tiền đã được gửi!",
    }
  },

  // Màn hình Cài đặt & Mời bạn bè (Settings)
  settings: {
    title: "Cài đặt & Giới thiệu",
    header: {
      title: "Xây dựng team của bạn!",
      subtitle: "Giới thiệu bạn bè và nhận thưởng.",
    },
    invite: {
      title: "Xây dựng team của bạn!",
      subtitle: "Giới thiệu bạn bè và nhận thưởng.",
      cardTitle: "Mời bạn bè",
      description: "Nhận ngay phần thưởng khi mời bạn bè tham gia.",
      button: "Mời bạn bè",
      refLink: "Link giới thiệu của bạn",
      shareText: "Tham gia cùng tôi nào! 🎰",
      statsTitle: "Thống kê giới thiệu",
      totalRef: "Tổng số lượt giới thiệu",
      estimatedEarnings: "Thu nhập ước tính",
      pending: "Đang chờ xử lý",
    },

    friends: {
      title: "Bạn bè",
      total: "{count} người",
      loading: "Đang tải danh sách...",
      empty: "Chưa có ai tham gia.",
      joined: "Tham gia {date}",
      name: "Tên",
      statusLabel: "Trạng thái",
      income: "Thu nhập",
      noMore: "Không có lượt giới thiệu nào nữa để hiển thị.",
      status: {
        rewarded: "Đã nhận thưởng",
        pending: "Đang chờ",
      }
    },
  },

  // Navigation
  navigation: {
    home: "Trang chủ",
    account: "Tài khoản",
    invite: "Mời bạn bè",
    ariaLabel: "Điều hướng chính",
  },

  // Error Boundary
  errorBoundary: {
    title: "Có lỗi xảy ra",
    message: "Ứng dụng gặp sự cố không mong muốn. Vui lòng thử lại sau.",
    reload: "Tải lại trang",
  },

  // Các thông báo lỗi (Validation/Errors)

  validation: {
    required: "Vui lòng không bỏ trống.",
    invalidNumber: "Vui lòng nhập số hợp lệ.",
    minAmount: "Số tiền rút tối thiểu là {amount}",
    maxAmount: "Số dư không đủ.",
    invalidBank: "Thông tin ngân hàng không hợp lệ.",
    guessTimeOver: "Đã hết thời gian dự đoán (sau 18:00).",
    alreadyGuessed: "Bạn đã dự đoán hôm nay rồi.",
  }
};

export default UI_TEXT;
