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
      <div className="px-2">
        <AdsgramTask
          blockId={blockId}
          debug={debug}
          onReward={onTaskReward}
          onError={onTaskError}
          onBannerNotFound={onBannerNotFound}
          onTooLongSession={onTooLongSession}
        />
      </div>
    </Modal>
  )
}
