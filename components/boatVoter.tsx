import {useMutation, useQuery} from "../convex/_generated/react";
import TopicVoter from "./topicVoter";

const BoatVoter = () => {
  const incrementVotes = useMutation('voteForBoat')
  const boats = useQuery('getBoats') ?? []

  return <TopicVoter
    name={'boat'}
    topics={boats}
    addTopicMutation={useMutation('addBoat')}
    handleVote={(_id) => incrementVotes(_id)}/>
}


export default BoatVoter