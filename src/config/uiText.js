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
  },

  // Màn hình Trang chủ (Home)
  home: {
    title: "Dự Đoán XSMB",
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
    },
    prizeSection: {
      title: "Giải Thưởng",
      specialPrize: "Giải Đặc Biệt",
      lotoPrize: "Giải Lô Tô",
    },
    tasks: {
      title: "Nhiệm vụ hàng ngày",
      checkIn: "Điểm danh hàng ngày",
      joinChannel: "Tham gia kênh thông báo",
      survey: "Khảo sát kiếm tiền",
      join: "Tham gia",
    },
    alerts: {
      rewardReceived: "Bạn đã nhận được phần thưởng!",
      taskError: "Có lỗi xảy ra khi thực hiện nhiệm vụ. Vui lòng thử lại!",
      noTask: "Hiện không có nhiệm vụ nào. Vui lòng thử lại sau!",
      sessionTimeout: "Phiên làm việc quá lâu. Vui lòng khởi động lại ứng dụng!",
      noUser: "Không tìm thấy thông tin user!",
      predictionRecorded: "Dự đoán của bạn đã được ghi nhận!",
    }
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
      cardTitle: "Mời bạn bè",
      description: "Nhận ngay phần thưởng khi mời bạn bè tham gia.",
      button: "Mời bạn bè",
      refLink: "Link giới thiệu của bạn",
      shareText: "Tham gia cùng tôi nào! 🎰",
    },
    friends: {
      title: "Bạn bè",
      total: "{count} người",
      loading: "Đang tải danh sách...",
      empty: "Chưa có ai tham gia.",
      joined: "Tham gia {date}",
      status: {
        rewarded: "Đã nhận thưởng",
        pending: "Đang chờ",
      }
    },
    community: {
      title: "Cộng đồng",
      channel: "Kênh Telegram Chính Thức",
      support: "Hỗ trợ khách hàng",
    },
    system: {
      theme: "Giao diện (Sáng/Tối)",
      language: "Ngôn ngữ",
      version: "Phiên bản",
    }
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
