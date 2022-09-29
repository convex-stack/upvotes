import {useMutation, useQuery} from "../convex/_generated/react";
import TopicVoter from "./topicVoter";

const NoteVoter = () => {
  const incrementVotes = useMutation('voteForNote')
  const notes = useQuery('getNotes') ?? []

  return <TopicVoter
    name={'note'}
    topics={notes}
    addTopicMutation={useMutation('addNote')}
    handleVote={(_id) => incrementVotes(_id)}/>
}


export default NoteVoter