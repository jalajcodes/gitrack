import { useEffect, useState } from 'react';
// import Board from '@lourenci/react-kanban';
import Board from 'react-trello';
// import '@lourenci/react-kanban/dist/styles.css';
import localforage from '../node_modules/localforage/dist/localforage';

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        {
          id: 'Card1',
          title: 'Write Blog',
          description: 'Can AI make memes',
          label: '30 mins',
          draggable: false
        },
        {
          id: 'Card2',
          title: 'Pay Rent',
          description: 'Transfer via NEFT',
          label: '5 mins',
          metadata: { sha: 'be312a1' }
        }
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: []
    },
    {
      id: 'lane3',
      title: 'Completed',
      label: '0/0',
      draggable: true,
      cards: []
    }
  ]
};

const updateBoard = async (info) => {
  try {
    console.log(info);
    await localforage.setItem('board', info);
  } catch (error) {
    console.log('Unable to update board.');
  }
};

const Kanban = ({ issues }) => {
  const [boardData, setBoardData] = useState(data);

  useEffect(() => {
    const fetchBoard = async () => {
      const board = await localforage.getItem('board');
      setBoardData(board);
    };
    fetchBoard();
  }, []);

  useEffect(() => {
    setBoardData(issues);
  }, [issues]);

  return (
    <Board
      data={boardData ? boardData : data}
      collapsibleLanes={true}
      draggable={true}
      editable={true}
      canAddLanes={true}
      editLaneTitle={true}
      onDataChange={updateBoard}
    />
    // <Board
    //   allowRemoveLane
    //   allowRenameColumn
    //   allowRemoveCard
    //   allowAddColumn
    //   allowRemoveColumn
    //   onLaneRemove={console.log}
    //   onCardRemove={console.log}
    //   onLaneRename={console.log}
    //   initialBoard={boardData}
    //   allowAddCard={{ on: 'top' }}
    //   onNewCardConfirm={(draftCard) => ({
    //     id: new Date().getTime(),
    //     ...draftCard
    //   })}
    //   onNewColumnConfirm={(draftColumn) => ({
    //     id: new Date().getTime(),
    //     ...draftColumn
    //   })}
    //   onColumnRemove={updateBoard}
    //   onCardNew={updateBoard}
    //   onCardDragEnd={updateBoard}
    //   onColumnNew={updateBoard}
    // />
  );
};

export default Kanban;
