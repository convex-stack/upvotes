import {useMutation, useQuery} from "../convex/_generated/react";
import TopicVoter from "./topicVoter";

const QuoteVoter = () => {
  const incrementVotes = useMutation('voteForQuote')
  const topics = useQuery("getQuotes") ?? []

  return <TopicVoter
    name={'quote'}
    topics={topics}
    addTopicMutation={useMutation('addQuote')}
    handleVote={(_id) => incrementVotes(_id, 1)}/>
}


export default QuoteVoter