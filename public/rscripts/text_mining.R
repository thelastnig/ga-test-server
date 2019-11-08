text_mining <- function(a) {
  
  #if (a == '') {
  #  ret = "no input";
  #  return(ret);
  #}



  tagPOS <-  function(x, ...) {
    s <- as.String(x)
    word_token_annotator <- Maxent_Word_Token_Annotator()
    a2 <- Annotation(1L, "sentence", 1L, nchar(s))
    a2 <- annotate(s, word_token_annotator, a2)
    a3 <- annotate(s, Maxent_POS_Tag_Annotator(), a2)
    a3w <- a3[a3$type == "word"]
    POStags <- unlist(lapply(a3w$features, `[[`, "POS"))
    POStagged <- paste(sprintf("%s/%s", s[a3w], POStags), collapse = " ")
    list(POStagged = POStagged, POStags = POStags)
  }

  str <- "this is a the first sentence."
  tagged_str <-  tagPOS(str)
  tagged_str

  SplitText <- function(Phrase) { 
    unlist(strsplit(Phrase," "))
  }
  trim <- function (x) gsub("^\\s+|\\s+$", "", x)

  IsPunctuated <- function(Phrase) {
    length(grep("\\.|,|!|\\?|;|:|\\)|]|}\\Z",Phrase,perl=TRUE))>0 # punctuation: . , ! ? ; : ) ] }
  }

  SelectTaggedWords <- function(Words,tagID) {
    Words[ grep(tagID,Words) ]
  }

  RemoveTags <- function(Words) {
    sub("/[A-Z]{2,3}","",Words)
  }

  IsSelectedWord <- function(Word) {
    ifelse(length(which(selected_words == Word))>0, TRUE, FALSE)
  }

  GetWordLinks <- function(position,scope) {
    scope <- ifelse(position+scope>length(words),length(words),position+scope)
    links <- ""
    for (i in (position+1):scope) {
      if ( IsSelectedWord(words[i]) ) links <- c(links,words[i])
    }
    
    if (length(links)>1) {
      links[2:length(links)]
    }
    else {
      links <- ""
    }
  }

  doc <- a

  corp <- Corpus(VectorSource(doc))
  corp <- tm_map(corp, stripWhitespace)
  corp <- tm_map(corp, tolower)
  words_with_punctuation <- SplitText(as.character(corp[[1]]))
  corp <- tm_map(corp, removePunctuation)

  words <- SplitText(as.character(corp[[1]]))
  tagged_text <- tagPOS(corp[[1]])
  tagged_words <- SplitText(as.character(tagged_text))
  tagged_words <- c(SelectTaggedWords(tagged_words,"/NN"))  
  tagged_words <- RemoveTags(tagged_words)                                                        
  selected_words <- unique(tagged_words)                                                          

  ret <- selected_words
  return(ret);
}
