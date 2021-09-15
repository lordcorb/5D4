import tweetRepository from "../repositories/tweet.repository.js";
import accountRepository from "../repositories/account.repository.js";

export default{
    Query:{
        tweets:() => tweetRepository.retrieveAll(),
        account:(_,args) => {
            return accountRepository.retrieveById(args.id);
        }
    },
    Mutation:{
        createTweet: async(_,args,ctx,info) => {
            const newTweet = tweetRepository.create(args.body);
            return newTweet;
        },
        likeTweet: async(_,args,ctx,info) => {
            const newLike = tweetRepository.likeTweet(args.id); 
            return newLike;
        }

    },
    Tweet:{
        author: async (tweet) => {
            return await accountRepository.retrieveById(tweet.author);
        }
    },
    Account:{
        tweets: async(account) => {
            return account.tweets;
        }
    }
}