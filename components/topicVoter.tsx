import {Id} from "../convex/_generated/dataModel";
import {FormEvent, useState} from "react";
import styles from "../styles/Home.module.css";

type TopicVoterProps = {
  name: string;
  topics: {text: string, votes: number, _id: Id<any> }[];
  addTopicMutation: (topicText: string) => void;
  handleVote: (_id: Id<any>) => void;
}

const TopicVoter = ({name, topics, addTopicMutation, handleVote}: TopicVoterProps) => {
  const [newTopicText, setNewTopicText] = useState("");

  async function handleAddTopic(event: FormEvent) {
    event.preventDefault();
    setNewTopicText("");
    await addTopicMutation(newTopicText);
  }

  return (<div className={styles.voting_tab}>
    <h1 className={styles.title}>
      {name} Voter
    </h1>
    {topics.map(({text, votes, _id}) =>
      <div className={styles.quote}>
        {text}
        <div>
          {votes}
          <button className={styles.button} style={{width: "auto"}} onClick={() => handleVote(_id)}> +1 </button>
        </div>
      </div>

    )}
    <form
      onSubmit={handleAddTopic}

    >
      <input
        value={newTopicText}
        onChange={event => setNewTopicText(event.target.value)}
        className="form-control w-50"
        placeholder={`New ${name}...`}
      />
      <input
        type="submit"
        value={`Add a ${name}!`}
        className={styles.button}
        disabled={!newTopicText}
      />
    </form>
  </div>)
}

export default TopicVoter;