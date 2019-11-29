args <- commandArgs(TRUE)
a <- args

Sys.setenv(LANGUAGE='en')
.libPaths("C:/Users/pjw/Documents/R/win-library/3.6")

library(NLP)
library(tm)
library(openNLP)
library(rjson)
source("./public/rscripts/text_mining.R")
source("./public/rscripts/tagPOS.R")
source("./public/rscripts/SplitText.R")
source("./public/rscripts/SelectTaggedWords.R")
source("./public/rscripts/RemoveTags.R")


# source("C:/Users/pjw/ga/ga-test-server/public/rscripts/text_mining.R")
# source("C:/Users/pjw/ga/ga-test-server/public/rscripts/tagPOS.R")
# source("C:/Users/pjw/ga/ga-test-server/public/rscripts/SplitText.R")
# source("C:/Users/pjw/ga/ga-test-server/public/rscripts/SelectTaggedWords.R")
# source("C:/Users/pjw/ga/ga-test-server/public/rscripts/RemoveTags.R")


#attach(input[[1]])
#doc <- df

doc <- a

corp <- Corpus(VectorSource(doc))
corp <- tm_map(corp, stripWhitespace)
corp <- tm_map(corp, tolower)
words_with_punctuation <- SplitText(as.character(corp[[1]]))
corp <- tm_map(corp, removePunctuation)

tagged_text <- tagPOS(corp[[1]])
tagged_words <- SplitText(as.character(tagged_text)) 
tagged_words <- c(SelectTaggedWords(tagged_words,"/NN"))  
tagged_words <- RemoveTags(tagged_words)    
                                                  
selected_words <- unique(tagged_words)          
result <- paste(selected_words, collapse = " ")
cat(result)
