import { Modal } from '../../../../components/common/Modal'
import { AdsgramTask } from '../AdsgramTask'

export const TaskModal = ({
  isOpen,
  onClose,
  blockId = 'task-20664',
  debug = false,
  onTaskReward,
  onTaskError,
  onBannerNotFound,
  onTooLongSession,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nhiệm vụ kiếm tiền">
      <div className="space-y-6">
        {/* Thông tin */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-purple-600 text-2xl">
              info
            </span>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 mb-1">
                Hoàn thành nhiệm vụ để nhận thưởng
              </h3>
              <p className="text-sm text-slate-600">
                Xem quảng cáo hoặc hoàn thành các nhiệm vụ để kiếm thêm coins và
                lượt dự đoán miễn phí!
              </p>
            </div>
          </div>
        </div>

        {/* Task Component */}
        <div className="bg-white rounded-lg p-6 border-2 border-slate-100">
          <AdsgramTask
            blockId={blockId}
            debug={debug}
            onReward={onTaskReward}
            onError={onTaskError}
            onBannerNotFound={onBannerNotFound}
            onTooLongSession={onTooLongSession}
          />
        </div>

        {/* Hướng dẫn */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-600">
              help
            </span>
            Hướng dẫn
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-xs mt-0.5">
                arrow_right
              </span>
              <span>Nhấn "Bắt đầu nhiệm vụ" để bắt đầu</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-xs mt-0.5">
                arrow_right
              </span>
              <span>Hoàn thành nhiệm vụ để mở khóa phần thưởng</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-xs mt-0.5">
                arrow_right
              </span>
              <span>Nhấn "Nhận thưởng" để nhận coins và lượt dự đoán</span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  )
}
