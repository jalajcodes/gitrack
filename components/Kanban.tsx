import { useEffect, useState } from 'react';
import Board from 'react-trello';
import localforage from '../node_modules/localforage/dist/localforage';

const mockData = {
  lanes: [
    {
      id: 'welcome',
      title: '🥳 Welcome!',
      cards: [
        {
          id: 'Card1',
          title: 'Hi there! Welcome.',
          description:
            'You can fetch issues assigned to you and arrange them here. State will be saved for the next time. Delete this lane from the three dots menu.',
          label: 'Label'
        }
      ]
    },
    // {
    //   id: 'recently-commented-issue',
    //   title: '⏰ Recently Commented Issues',
    //   cards: []
    // },
    {
      id: 'issues',
      title: '👩‍🏫 Issues',
      cards: []
    },
    {
      id: 'wip',
      title: '🔨 Work in Progress',
      cards: []
    },
    {
      id: 'pr',
      title: '✅ Created PR',
      cards: []
    },
    {
      id: 'changes',
      title: '🔂 Change Requested',
      cards: []
    },
    {
      id: 'merged',
      title: "🎉 Merged PR's",
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

const Kanban = ({ eventBusHandle }) => {
  const [boardData, setBoardData] = useState(mockData);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const board = await localforage.getItem('board');
        if (board) {
          setBoardData(board);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBoard();
  }, []);

  return (
    <Board
      data={boardData ? boardData : mockData}
      collapsibleLanes={true}
      eventBusHandle={eventBusHandle}
      draggable={true}
      editable={true}
      canAddLanes={true}
      editLaneTitle={true}
      onDataChange={updateBoard}
    />
  );
};

export default Kanban;
