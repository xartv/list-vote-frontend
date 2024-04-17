'use client';

import { useState } from 'react';

import { Button } from '@/components/Button';

import { useAssignList } from '@/hooks/useAssignList';
import { useDeleteListAssignment } from '@/hooks/useDeleteListAssignment';

interface ListAssignmentProps {
  listId: string;
}

export function ListAssignment({ listId }: ListAssignmentProps) {
  const [userEmail, setUserEmail] = useState('');

  const { assignList } = useAssignList();
  const { deleteListAssignment } = useDeleteListAssignment();

  return (
    <div className='mt-auto flex flex-col gap-2'>
      <input
        value={userEmail}
        onChange={event => setUserEmail(event.target.value)}
      />

      <div className='flex justify-between'>
        <Button
          size='fit'
          onClick={() => assignList({ listId, userEmail })}
        >
          Assign
        </Button>
        <Button
          size='fit'
          onClick={() => deleteListAssignment({ listId, userEmail })}
        >
          Unassign
        </Button>
      </div>
    </div>
  );
}
