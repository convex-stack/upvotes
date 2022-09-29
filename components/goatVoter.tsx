import { Id } from "../convex/_generated/dataModel";
import {useMutation, useQuery} from "../convex/_generated/react";
import TopicVoter from "./topicVoter";

const GoatVoter = ({userId}: {userId: Id<'users'>}) => {
  const incrementVotes = useMutation('voteForGoat')
  const goats = useQuery("getGoats") ?? []

  return <TopicVoter
    name={'goat'}
    topics={goats.map((g) =>  ( {
      votes: g.voters.length,
      disableVoting: g.voters.map((v) => v.id).indexOf(userId.id) >= 0,
        ...g
    }))}
    addTopicMutation={useMutation('addGoat')}
    handleVote={(_id) => incrementVotes(_id)}/>
}


export default GoatVoter