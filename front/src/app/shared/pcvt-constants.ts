export class PcvtConstants {

  static readonly CHARACTERIZATION_QUESTIONS: Array<any> = [
    {
      "category": "Stating the goals",
      "questions": [
        {
          "key": "statingGoals1",
          "label": "Do you plan to interact with the participants during the experiment?"
        }
      ]
    },
    {
      "category": "Hypotheses, variables and measurements",
      "questions": [
        {
          "key": "hypotheses1",
          "label": "Is it possible for participants to have prior knowledge of the experiment's hypotheses?"
        },
        {
          "key": "hypotheses2",
          "label": "Was there a definition of a guide, method or protocol for data measurement?"
        },
        {
          "key": "hypotheses3",
          "label": "Is it possible that the defined metric(s) does not represent the real effect?"
        },
        {
          "key": "hypotheses4",
          "label": "Will only one metric be used to answer survey questions?"
        },
        {
          "key": "hypotheses5",
          "label": "The confidence interval used may not be appropriate to draw conclusions?"
        }
      ]
    },
    {
      "category": "Participants",
      "questions": [
        {
          "key": "participants1",
          "label": "Will there be participants with different levels of experience or abilities in any task to be performed during the experiment?"
        },
        {
          "key": "participants2",
          "label": "Will there be participants with different gender, personality or other characteristics?"
        },
        {
          "key": "participants3",
          "label": "Is the language of the participants different from the language of the experimental material?"
        },
        {
          "key": "participants4",
          "label": "Will participants handle more than one treatment?"
        },
        {
          "key": "participants5",
          "label": "Will participants receive any kind of reward for participating in the experiment?"
        },
        {
          "key": "participants6",
          "label": "Is it possible that the participants who will be selected have participated in similar studies previously?"
        },
        {
          "key": "participants7",
          "label": "May there be lack of motivation for participants to participate in the study?"
        },
        {
          "key": "participants8",
          "label": "Is it possible that one of the participants leaves the experiment?"
        },
        {
          "key": "participants9",
          "label": "May there be communication between the participants during the experiment?"
        },
        {
          "key": "participants10",
          "label": "Will collect data from participants via characterization and/or demographic questionnaire?"
        },
        {
          "key": "participants11",
          "label": "May the participants not represent the target population?"
        },
        {
          "key": "participants12",
          "label": "Can the size of the selected sample be considered small?"
        },
        {
          "key": "participants13",
          "label": "May events occur in the experimental environment that can influence the performance of the participants?"
        }
      ]
    },
    {
      "category": "Experimental materials and tasks",
      "questions": [
        {
          "key": "experimentalMaterials1",
          "label": "The experimental devices and procedures (tools, materials, technologies, tools, tasks, etc.) may not represent those used in the actual context?"
        },
        {
          "key": "experimentalMaterials2",
          "label": "The experimental procedures (tools, materials, technologies, tools, etc.) are different for a group of participants?"
        },
        {
          "key": "experimentalMaterials3",
          "label": "Among the experimental artifacts of the experiment is there the use of a requirements document?"
        },
        {
          "key": "experimentalMaterials4",
          "label": "If its context is for inspection, will it be necessary to insert defects in the artifacts?"
        },
        {
          "key": "experimentalMaterials5",
          "label": "The tasks to be performed by the groups are different?"
        },
        {
          "key": "experimentalMaterials6",
          "label": "The tasks to be performed will be developed by the researchers?"
        }
      ]
    },
    {
      "category": "Experimental design",
      "questions": [
        {
          "key": "experimentalDesign1",
          "label": "The treatments used in the experiment may not represent those normally used in the real context?"
        },
        {
          "key": "experimentalDesign2",
          "label": "Is there the possibility of using a treatment influence other treatments?"
        },
        {
          "key": "experimentalDesign3",
          "label": "Will each group use only an experimental artifact, or task, or treatment?"
        }
      ]
    },
    {
      "category": "Procedure",
      "questions": [
        {
          "key": "procedure1",
          "label": "The environment in which the experiment will be conducted can not represent the actual context of the study?"
        },
        {
          "key": "procedure2",
          "label": "Is the experiment conducted in different experimental environments?"
        },
        {
          "key": "procedure3",
          "label": "It will be allowed interval between runs of the experiment?"
        },
        {
          "key": "procedure4",
          "label": "The training given to the participants and/or groups will be taught by different people?"
        },
        {
          "key": "procedure5",
          "label": "Is there a risk that some of the participants do not understand or are not sufficiently familiar with the experimental material?"
        },
        {
          "key": "procedure6",
          "label": "Is it possible that the pilot study is not sufficient to reveal possible problems with the execution of the experiment?"
        },
        {
          "key": "procedure7",
          "label": "Will a time limit be determined for the execution of the experiment activities?"
        },
        {
          "key": "procedure8",
          "label": "Will there be a description of the events and an order of presentation of the experimental material for the participants?"
        }
      ]
    },
    {
      "category": "Data collection and analysis procedure",
      "questions": [
        {
          "key": "dataCollection1",
          "label": "Is there the possibility of the data that will be collected are not complete, accurate and/or reliable?"
        },
        {
          "key": "dataCollection2",
          "label": "Do you plan to include observant researchers during the experiment?"
        },
        {
          "key": "dataCollection3",
          "label": "Will any set of procedures, protocol or method be used for data analysis?"
        },
        {
          "key": "dataCollection4",
          "label": "Will any procedure be used to resolve possible disagreements in data analysis?"
        },
        {
          "key": "dataCollection5",
          "label": "Do you describe/reference the procedures and criteria that support the statistical rigor of the study?"
        }
      ]
    },
    {
      "category": "Document",
      "questions": [
        {
          "key": "document1",
          "label": "If your experiment is a replication, will there be a change in the experimental package from the original study?"
        },
        {
          "key": "document2",
          "label": "Do you plan to submit or indicate where the raw data from your experiment will be available?"
        }
      ]
    }
  ];


  static readonly REVIEW_INSTRUMENT_QUESTIONS: Array<any> = [
    {
      section: 'Stating the goals',
      questions: [
        {
          projectKey: 'sg1',
          reviewItemIndex: 0,
          title: 'Are the aims clearly and precisely stated?',
          hint: 'One way to define the experiment goal is to use the GQM template. The purpose of a goal definition template is to ensure that important aspects of an experiment are defined before the planning and execution take place. By defining the goal of the experiment according to this template, the foundation is properly laid [Wohlin 2012].',
          considerations: {
            state: 'Consider whether the experiment’s goals describe:',
            items: [
              'A clear purpose.',
              'Specific Objectives.',
              'The reasons for undertaking the experiment, clearly and explicitly stated.'
            ]
          }
        },
        {
          projectKey: 'sg2',
          reviewItemIndex: 1,
          title: 'Are the research questions linked to research goals and clearly defined?',
          hint: '',
          considerations: {
            state: 'Consider:',
            items: [
              'Context of the research questions.',
              'Relevance of the research questions.'
            ]
          }
        },
        {
          projectKey: 'sg4',
          reviewItemIndex: 2,
          title: 'Based on the research goals, is controlled experiment the most appropriate research technique to use?',
          hint: 'Wohlin (2012) presents a comparison of empirical strategies in Chapter 2, Section 5 (pg.18),and Easterbrook 2008 presents an overview of the factors that should be involved in selecting an appropriate research technique for software engineering research.',
          considerations: {
            state: 'Consider:',
            items: [
              'Execution control',
              'Measurement control',
              'Investigation cost',
              'Possibility to replicate'
            ]
          }
        },
        {
          projectKey: 'sg3',
          reviewItemIndex: 3,
          title: 'Do the objectives of the experiment satisfy ethical concerns?',
          hint: 'Experimenters should describe the relationship between themselves and participants and if that relationship has been adequately considered. The experimenters should critically examine their own role, potential bias and influence during formulation of the research questions, data collection, including sample recruitment and choice of location. Also, the experimenter should describe how they will respond to events during the study [Dyba and Dingsoyr 2008] and [CASP 2013].',
          considerations: {
            state: 'Consider:',
            items: [
              'The participants have access to all information they need about the study, before making their decision to participate or not.',
              'If there are sufficient details of how the research will be explained to participants to assess whether ethical standards will be maintained.',
              'The integrity of individuals/organizations is taken into account.',
              'The experiment has scientific value.',
              'The beneficence outweighs the risks.',
              'The experimenters maintain confidentiality of data.',
              'If the experimenters have discussed issues raised by the study (e.g. issues around informed consent or confidentiality or how they have handled the effects of the study on the participants) during and after the study.',
              'The study design approval has been sought from the ethics committee at the institution.'
            ]
          }
        }
      ]
    },
    {
      section: 'Hypotheses, Variables and Measurements',
      questions: [
        {
          projectKey: 'hvm1',
          reviewItemIndex: 4,
          title: 'Are the hypotheses of the research clearly described and are they related to the research goals?',
          hint: '',
          considerations: {
            state: 'Consider:',
            items: [
              'The objective should be translated into a formal hypothesis.',
              'For each goal stated in the research objective, the null hypotheses, and their corresponding alternative hypotheses should be described.',
              'The description of both null and alternative hypotheses should be as formal as possible.',
              'Any statistical hypotheses should be described.',
              'The main hypotheses should be explicitly separated from ancillary hypotheses and exploratory analyses. In the case of ancillary hypotheses, a hierarchical system is appropriate. Hypotheses need to state the treatments and the control conditions.'
            ]
          }
        },
        {
          projectKey: 'hvm2',
          reviewItemIndex: 5,
          title: 'Have experimenters defined the variables or attributes to be measured?',
          hint: 'Dependent variables need to be defined and justified in terms of their relevance to the goals listed in the Research Objectives [Jedlitschka 2008].',
          considerations: {
            state: 'Consider whether:',
            items: [
              'Independent variables, dependent variables (response variables), factors, parameters, and contextual variables are described.'
            ]
          }
        },
        {
          projectKey: 'hvm4',
          reviewItemIndex: 6,
          title: 'Do the research measures allow the questions to be answered?',
          hint: '',
          considerations: {
            state: 'Consider whether:',
            items: [
              'The measures are the most relevant ones for answering the research question.',
              'The outcome measures are meaningful and relevant to the objectives of the experiment.',
              'The experimenters justify the choice of outcome measures in terms of their relevance to the objectives of the experiment.',
            ]
          }
        },
        {
          projectKey: 'hvm3',
          reviewItemIndex: 7,
          title: 'Are the outcome measures valid and clearly described?',
          hint: 'These are indicators of valid measures [Kitchenham 2009]: (1) The measures are plausible measures of the construct they are meant to represent. (2) The measures are direct measures of well-defined concepts. (3) The measurement scales are respected (e.g. categorical measures are not treated as ordinal or interval). (4) The data collection process is defined and appropriate.',
          considerations: {
            state: 'Consider whether:',
            items: [
              'The type of metrics that will be calculated is described.',
              'It is described how the measures will be obtained.',
              'Criteria for measuring and judging effects are defined.',
              'The experimenters describe how they are going to measure the metric that they define for the dependent variables (response variables).',
              'A valid and reliable method is used to determine the outcome measures.'
            ]
          }
        }
      ]
    },
    {
      section: 'Participants',
      questions: [
        {
          projectKey: 'p1',
          reviewItemIndex: 8,
          title: 'Is the recruitment strategy appropriate to the aims of the research?',
          hint: 'In case of recruiting remote participants, consider whether the fact that participants may mask the results is controlled for [Ko 2015]. The identification of an appropriately general group of participants is always a challenge. Appropriate recruiting methods can help, but there are no guarantees. Despite your best efforts to find a representative population you always face the possibility that your group of participants is insufficiently representative in a way that was unanticipated. As this bias is always possible, it’s best to explicitly state what steps you have taken to account for potentially confounding variables and to be cautious when making claims about your results [Lazar2010].',
          considerations: {
            state: 'Consider:',
            items: [
              'Recruitment materials are appropriate, such as e-mail, poster, or advertisement.',
              'It is specified if the experiment will use in person or remote participants.',
              'What level of compensation will be offered to the participants, such as payments, no payments (the participants will be volunteers), grades.',
              'Cultural differences can affect the recruiting strategy.'
            ]
          }
        },
        {
          projectKey: 'p2',
          reviewItemIndex: 9,
          title: 'Is the recruitment process clearly described?',
          hint: 'A description of the motivation for the participants to participate is mandatory. For instance, it should be stated whether the participants were paid and if so, how much, or whether they earned educational credits for taking part in the experiment [Jedlitschka 2008].',
          considerations: {
            state: 'Consider whether the recruitment process is specified in terms of:',
            items: [
              'Who to recruit, including eligibility criteria for participants.',
              'Dates defining the periods for recruitment.',
              'How many participants will be recruited.',
              'Descriptions of the study participants in terms of, for example, SE experience, type (student, practitioner, consultant), nationality, task experience and other relevant variables.',
              'What knowledge/experience the participants need to know to be able to do the experimental tasks.',
              'The motivation for the participants to participate in the study.',
              'If they are voluntary participants, or if they will receive payments, educational credits, or other kind of advantage.'
            ]
          }
        },
        {
          projectKey: 'p3',
          reviewItemIndex: 10,
          title: 'Is a demographic questionnaire planned to collect information from participants?',
          hint: 'Surveys and interviews are common ways of collecting and measuring demographic variables. This data can be gathered before or after a task, or even as part of testing a potential participant against inclusion criteria [Ko_2013].',
          considerations: {
            state: 'Consider:',
            items: [
              'The content of demographic questionnaire (that is, questions that describe the participants) is described.',
              'Demographic data are characteristics and attributes of a population, such as age, gender, and other characteristics that are of particular interest to the researcher.',
              'The experimenters describe when the demographic data will be collected.',
              'How the demographic data will be used is described.'
            ]
          }
        },
        {
          projectKey: 'p4',
          reviewItemIndex: 11,
          title: 'Does the researcher define the population from which participants are drawn?',
          hint: '',
          considerations: {
            state: 'Consider whether:',
            items: [
              'The experimenters define carefully the population about which he/she are seeking to make inferences from the results of the experiment.'
            ]
          }
        },
        {
          projectKey: 'p5',
          reviewItemIndex: 12,
          title: 'Is the sample well described?',
          hint: 'A more principled way to decide how many participants to recruit is to do a prospective power analysis (e.g., Dybå et al. 2006), which gives an estimate of the sample size required to detect a difference between experimental conditions. The exact calculation of this estimate depends on the specific statistical test used to compare the groups, but it generally requires three inputs: (1) the expected effect size (the difference in the outcome variable between groups), (2) the expected variation in this outcome measurement, and (3) the Type I error rate α (typically .05 in software engineering). The first two must be estimated. One source of these estimates is to use data from previous experiments on the tool or even pilot studies There are also standard approaches for estimating sample size and effect size such as Cohen’s d, odds ratio, and Abelson’s Causal Efficacy Ratio. Breaugh (2003) provides an accessible introduction to these topics [Ko 2015].',
          considerations: {
            state: 'Consider whether the sample is described in terms of:',
            items: [
              'The sample size is justified.',
              'The study has an adequate sample size (one large enough) to detect meaningful effects of the intervention.'
            ]
          }
        },
        {
          projectKey: 'p6',
          reviewItemIndex: 13,
          title: 'Is the debriefing of participants clearly defined?',
          hint: 'After a participant has completed the tasks, it is common practice in human subjects research to debrief the participant about the study. Debriefing can also be an opportunity to get speculative feedback from participants about how they felt about the tool. If participants did not use the experimental treatment, it may be instructive for them to try it and provide feedback. Participants should not leave a study feeling as if they “failed,” especially when tasks may have been designed to ensure that not every participant would succeed. Many ethicists feel that is a necessary part of research with human participants [Ko 2015].',
          considerations: {
            state: 'Consider if the experimenters describe how they will [Ko 2015]:',
            items: [
              'Explain to the participant what the study is investigating.',
              'Explain why the study is important to conduct.',
              'Explain how the participant’s data will be used to investigate the question.',
              'Explain the correct solutions to the tasks.',
              'Provide contact information so that the participant can ask further questions if they want to know more about the research.',
              'Provide instructions about information that participants should not share with others. For example, if one is recruiting from a student population, students might share the answers to the tasks with their friends, who may later participate in the study.'
            ]
          }
        }
      ]
    },
    {
      section: 'Experimental Materials and Tasks',
      questions: [
        {
          projectKey: 'emt1',
          reviewItemIndex: 14,
          title: 'Do the experimenters clearly describe what instruments, materials, technology, and tools will be used and how?',
          hint: 'All experimental materials and equipment should be described. For example, if the study involves a questionnaire, questions should be described, as should any other characteristics of the questionnaire [Jedlitschka 2008].',
          considerations: {
            state: 'Consider how well the experimenters have described:',
            items: [
              'Which objects are selected and why.',
              'Experimental materials, raw data, programs, artifacts, specifications, code, whatever they need for running the experiment itself.',
              'Technology information to reproduce the experiment.',
              'Description of any tools that need to be purchased and any training required. Instructions must be written out or recorded properly.',
              'Forms and questionnaires for the participants to fill out, interview materials.',
              'All characteristics of the experimental material that might have an impact on the results.',
              'Experimental infrastructure that will be used by participants during the data collection, such as how many computers they will need and for how long.'
            ]
          }
        },
        {
          projectKey: 'emt2',
          reviewItemIndex: 15,
          title: 'Are the tasks that will be performed by the participants described in detail?',
          hint: '',
          considerations: {
            state: 'Consider whether the following are fully described:',
            items: [
              'The tasks to be performed by subjects.',
              'The scope of the tasks.',
              'The feature coverage of the new technology the tasks will exploit.',
              'If the experiment will be performed in a physical or virtual location.',
              'The origin of the tasks.',
              'The task duration. E.g.: unlimited time to work on a task (allowing either the participant or the experimenter to decide when the task is complete) or a time limit.',
              'Task difficulty.',
              'Number of tasks needed for the experiment.',
              'The information the participants will receive before they start the tasks.',
              'How much training the participants will receive to be able to use the new technology.',
              'The rationale behind the selection of roles, artefacts, viewpoints, etc.',
              'Whether the description includes precisely what happens to the participants from the moment they arrive to the moment they leave.',
              'The procedures to prevent or minimize any potential risk or discomfort. For example, fatigue during the experiment, cultural differences, language.',
              'If the experiment is a replication, the discussion of the adjustments and their rationales.'
            ]
          }
        },
        {
          projectKey: 'emt3',
          reviewItemIndex: 16,
          title: 'Do the experimenters define success with respect to the experimental tasks and how success will be measured?',
          hint: '',
          considerations: {
            state: 'Consider whether the following are described adequately:',
            items: [
              'The goal state that a participant must reach to be counted as successful.',
              'A method for determining when a goal state has been reached.',
              'A method of communicating the goal to participants that all participants will interpret similarly.'
            ]
          }
        }
      ]
    },
    {
      section: 'Experimental Design',
      questions: [
        {
          projectKey: 'ed1',
          reviewItemIndex: 17,
          title: 'Is the Experiment Design the most appropriate?',
          hint: 'The choice of design should involve consideration of sample size (number of replicates), selection of a suitable run order for the experimental trials, and determination of whether or not blocking or other randomization restrictions are involved [Montgomery 2013]. For the description of the experimental design in the experimental plan, it is important that not only the final design of the experiment is in there, but it should have also an explanation of how the design was arrived at and why experimenters have chosen that design and not a different one.',
          considerations: {
            state: 'Consider:',
            items: [
              'If the research design is appropriate to address the aims of the research.',
              'General Design Principles: randomization, blocking, and balancing.',
              'If the experiment design is the most appropriate for the variables involved.',
              'If there is a justification for why the experimenters have chosen their experimental design.'
            ]
          }
        },
        {
          projectKey: 'ed2',
          reviewItemIndex: 18,
          title: 'Are the treatments well defined?',
          hint: '',
          considerations: {
            state: 'Consider:',
            items: [
              'Whether the experimental treatments have been defined sufficiently precisely for them to be applied correctly by the experimenter or by those wishing to repeat the experiment.',
              'How realistic the treatments are.',
              'Alternatives or levels and treatment definitions.',
              'Whether the experiment is a within – or between-subjects design, or a mixed factors design, with a description of each of the levels of the independent variables.',
              'Whether there is a control group with which to compare treatments?',
              'Whether all treatment groups (including any control groups) are planned to be treated equivalently during the preparation for and conduct of the experiment'
            ]
          }
        },
        {
          projectKey: 'ed3',
          reviewItemIndex: 19,
          title: 'Do the experimenters define the process by which they will apply the treatment to objects and subjects (e.g. randomization)?',
          hint: 'Experimenters have to think through how they will assign subjects to tasks and treatments, and in what order.',
          considerations: {
            state: 'Consider whether:',
            items: [
              'Treatments are randomly allocated.',
              'Participants are appropriately allocated to treatments given the number of participants and the overall experimental design.',
              'All measures for randomization are described, especially the random allocation of participants to treatments.',
              'The number of relationships among subjects, objects and variables is carefully described in the experimental plan.'
            ]
          }
        },
        {
          projectKey: 'ed4',
          reviewItemIndex: 20,
          title: 'Is an appropriate blinding procedure used (e.g. blind allocation of materials, blind marking)?',
          hint: '',
          considerations: {
            state: 'Consider whether:',
            items: [
              'Lack of blinding could introduce bias.',
              'Investigators will be kept ‘blind’ to participants exposure to the intervention.',
              'Investigators will be kept ‘blind’ to other important confounding and prognostic factors.',
              'The study participants will be aware of the research question.',
              'For any kind of blinding (e.g., blind allocation), the details are provided.'
            ]
          }
        }
      ]
    },
    {
      section: 'Procedure',
      questions: [
        {
          projectKey: 'pcd1',
          reviewItemIndex: 21,
          title: 'Is there an adequate description of the context in which the experiment will be carried out?',
          hint: '',
          considerations: {
            state: 'Consider whether:',
            items: [
              'Where the experiment should be executed is described.',
              'The environment (location) of the experiment is representative for the study\'s objectives.'
            ]
          }
        },
        {
          projectKey: 'pcd2',
          reviewItemIndex: 22,
          title: 'Is there a description of any training that will be provided?',
          hint: 'The study should provide a way to teach the concepts and skills quickly and effectively and devise a way to ensure that the participants have successfully learned the material [Ko 2015].',
          considerations: {
            state: 'Consider:',
            items: [
              'The description of training provided to the participants.',
              'Whether experimenters will provide training on how to use the new technology.',
              'Terminology of the new technology.',
              'The design of the programs they will work with during tasks.',
              'The decision of what to teach and what to have participants learn during the tasks.'
            ]
          }
        },
        {
          projectKey: 'pcd3',
          reviewItemIndex: 23,
          title: 'Is a Pilot described?',
          hint: 'Designing a study with human participants is necessarily an iterative process. Running an experiment for the first time, like testing software for the first time, will reveal a range of problems, which might include confusing study materials, bugs in the tool, confusion about the tasks, and unanticipated choices made by participants. Sandbox pilots and analytical evaluation are good options of pre-pilots because they are easy to schedule and can reveal problems with the experiment without the trouble of recruiting outsiders. Ko (2015) brings interesting tips about pilot and pre-pilots [Ko 2015]. If possible, a pilot of the experiment on a small set of people may be useful, so that you are sure that the plan is complete and the instructions understandable [Pfleeger 1995].',
          considerations: {
            state: '',
            items: []
          }
        },
        {
          projectKey: 'pcd4',
          reviewItemIndex: 24,
          title: 'Do experimenters describe the schedule in which the experiment will be run?',
          hint: '',
          considerations: {
            state: 'Consider',
            items: [
              'How many hours/ days the experiment will be run.',
              'How experimenters have organized these days.',
              'Which activities experimenters will cover each day.',
              'The schedule for the experiment, and how long the experiment will take on each day.',
              'What events will happen during the experiments, in what order, and with what timing.',
              'How many times the experiment will be repeated.'
            ]
          }
        }
      ]
    },
    {
      section: 'Data Collection and Data Analysis',
      questions: [
        {
          projectKey: 'dcda1',
          reviewItemIndex: 25,
          title: 'Are the data collection procedures well described?',
          hint: 'Details of the data collection method have to be described, including when the data will be collected, by whom, and with what kind of support (e.g., tool). Any type of transformation of the data (e.g., marking “true” defects in defect lists) and training provided for such should also be described [Jedlitschka 2008].',
          considerations: {
            state: 'Consider whether:',
            items: [
              'The data collection is planned in a way that addresses the research issue.',
              'The data collection methods are adequately described.',
              'The data collection procedures are sufficient for the purpose (data sources, collection, storage, validation)?',
              'Any quality control method that will be used to ensure completeness and accuracy of data collection.'
            ]
          }
        },
        {
          projectKey: 'dcda2',
          reviewItemIndex: 26,
          title: 'Are the analysis procedures clearly described?',
          hint: '',
          considerations: {
            state: 'Consider:',
            items: [
              'How experimenters are going to analyze the data they will obtain.',
              'The description of the analysis procedure detailing which methods will be used to test the hypotheses in analyzing the data.',
              'The types of analysis.'
            ]
          }
        },
        {
          projectKey: 'dcda3',
          reviewItemIndex: 27,
          title: 'Are the statistical methods described?',
          hint: '',
          considerations: {
            state: 'Consider:',
            items: [
              'The statistical context and methods applied.',
              'Whether the statistical methods are appropriate for the study design.',
              'The rationale and justification for the statistical methods.',
              'If the results were not analyzed statistically, whether statistical analysis could have provided additional descriptive and analytical insight.',
              'Whether references are cited for all statistical procedures used.'
            ]
          }
        },
        {
          projectKey: 'dcda4',
          reviewItemIndex: 28,
          title: 'How precise is the estimate of the treatment effect?',
          hint: '',
          considerations: {
            state: 'Consider:',
            items: [
              'How experimenters will interpret the possible outcomes of the experiment.',
              'The confidence limits.',
              'Whether potential confounders are adequately controlled for in the analysis.',
              'How it is ensured that the data do not violate the assumptions of the tests used on them.'
            ]
          }
        }
      ]
    },
    {
      section: 'Threats to Validity',
      questions: [
        {
          projectKey: 'tv1',
          reviewItemIndex: 29,
          title: 'Do the experimenters identify and discuss threats to validity, study limitations, potential biases or confounders that may influence the experiment results?',
          hint: 'A fundamental question concerning results from an experiment is how valid the results are. It is important to consider the question of validity already in the planning phase in order to plan for adequate validity of the experiment results. Adequate validity refers to that the results should be valid for the population of interest. [Wohlin 2012]. [Anderlin Neto and Conte 2014] presents a tool to assist inexperienced researchers in identifying and addressing threats to validity in the planning stages of controlled experiments in software engineering',
          considerations: {
            state: 'Consider:',
            items: [
              'Whether mention is made of the threats to validity in the experimental plan and also how these threats can affect the results and findings.',
              'Whether the experimenters discuss the limitations of their study.',
              'Whether the experimenters discuss potential experiment bias.',
              'Whether the experimenters report the rationale of their decisions in terms of how the balanced different threats to validity.'
            ]
          }
        }
      ]
    },
    {
      section: 'Document',
      questions: [
        {
          projectKey: 'd1',
          reviewItemIndex: 30,
          title: 'Is the experimental plan suitable for its audience, easy to read and well structured?',
          hint: 'Instead of targeting a perfect study, it would be better if researchers just started running studies even if they are not perfect, or even if they are simpler. The basic problem in doing experimentation in software engineering today is because everybody sees experiments as very difficult to run, and currently, researchers who are reviewing studies want the studies to be perfect. It is important that we think less about whether the study is methodologically perfect, and more about what we have really learned by running the study even if it has limitations, and even if there are questions about external validity in terms of the generalization of the results. If researchers were able to run more studies, especially smaller ones, it would be a big step for our field because there is so much we do not know. There more studies we can run, the more opportunities we have to learn more about software engineering experiments',
          considerations: {
            state: 'Consider whether:',
            items: [
              'The terms are defined in such a way that it is possible to replicate the study.',
              'The experiment addresses a clearly focused issue.'
            ]
          }
        }
      ]
    }
  ];

  static readonly INSTRUMENT_QUESTIONS: Array<any> = [
    {
      section: 'Stating the goals',
      questions: [
        {
          projectKey: 'sg1',
          title: 'State the aims clearly and precisely.',
          hint: 'One way to define the experiment goal is to use the GQM template. The purpose of a goal definition template is to ensure that important aspects of an experiment are defined before the planning and execution take place. By defining the goal of the experiment according to this template, the foundation is properly laid [Wohlin 2012].',
          considerations: {
            state: 'Consider whether the experiment’s goals describe:',
            items: [
              'A clear purpose.',
              'Specific Objectives.',
              'The reasons for undertaking the experiment, clearly and explicitly stated.'
            ]
          }
        },
        {
          projectKey: 'sg2',
          title: 'Define clearly the research questions linked to research goals.',
          hint: '',
          considerations: {
            state: 'Consider:',
            items: [
              'Context of the research questions.',
              'Relevance of the research questions.'
            ]
          }
        },
        {
          projectKey: 'sg3',
          title: 'Define ethical concerns regards to the objectives of the experiment.',
          hint: 'Experimenters should describe the relationship between themselves and participants and if that relationship has been adequately considered. The experimenters should critically examine their own role, potential bias and influence during formulation of the research questions, data collection, including sample recruitment and choice of location. Also, the experimenter should describe how they will respond to events during the study [Dyba and Dingsoyr 2008] and [CASP 2013].',
          considerations: {
            state: 'Consider:',
            items: [
              'The participants have access to all information they need about the study, before making their decision to participate or not.',
              'If there are sufficient details of how the research will be explained to participants to assess whether ethical standards will be maintained.',
              'The integrity of individuals/organizations is taken into account.',
              'The experiment has scientific value.',
              'The beneficence outweighs the risks.',
              'The experimenters maintain confidentiality of data.',
              'If the experimenters have discussed issues raised by the study (e.g. issues around informed consent or confidentiality or how they have handled the effects of the study on the participants) during and after the study.',
              'The study design approval has been sought from the ethics committee at the institution.'
            ]
          }
        }
      ]
    },
    {
      section: 'Hypotheses, Variables and Measurements',
      questions: [
        {
          projectKey: 'hvm1',
          title: 'Describe clearly the hypotheses of the research. They should be related to the research goals.',
          hint: '',
          considerations: {
            state: 'Consider:',
            items: [
              'The objective should be translated into a formal hypothesis.',
              'For each goal stated in the research objective, the null hypotheses, and their corresponding alternative hypotheses should be described.',
              'The description of both null and alternative hypotheses should be as formal as possible.',
              'Any statistical hypotheses should be described.',
              'The main hypotheses should be explicitly separated from ancillary hypotheses and exploratory analyses. In the case of ancillary hypotheses, a hierarchical system is appropriate. Hypotheses need to state the treatments and the control conditions.'
            ]
          }
        },
        {
          projectKey: 'hvm2',
          title: 'Define the variables or attributes to be measured.',
          hint: 'Dependent variables need to be defined and justified in terms of their relevance to the goals listed in the Research Objectives [Jedlitschka 2008].',
          considerations: {
            state: 'Consider whether:',
            items: [
              'Independent variables, dependent variables (response variables), factors, parameters, and contextual variables are described.'
            ]
          }
        },
        {
          projectKey: 'hvm3',
          title: 'Describe valid and clearly outcome measurements.',
          hint: '',
          considerations: {
            state: 'Consider whether:',
            items: [
              'The measures are the most relevant ones for answering the research question.',
              'The outcome measures are meaningful and relevant to the objectives of the experiment.',
              'The experimenters justify the choice of outcome measures in terms of their relevance to the objectives of the experiment.'
            ]
          }
        }
      ]
    },
    {
      section: 'Participants',
      questions: [
        {
          projectKey: 'p1',
          title: 'Describe appropriated recruitment strategy to the aims of the research',
          hint: 'In case of recruiting remote participants, consider whether the fact that participants may mask the results is controlled for [Ko 2015]. The identification of an appropriately general group of participants is always a challenge. Appropriate recruiting methods can help, but there are no guarantees. Despite your best efforts to find a representative population you always face the possibility that your group of participants is insufficiently representative in a way that was unanticipated. As this bias is always possible, it’s best to explicitly state what steps you have taken to account for potentially confounding variables and to be cautious when making claims about your results [Lazar2010].',
          considerations: {
            state: 'Consider:',
            items: [
              'Recruitment materials are appropriate, such as e-mail, poster, or advertisement.',
              'It is specified if the experiment will use in person or remote participants.',
              'What level of compensation will be offered to the participants, such as payments, no payments (the participants will be volunteers), grades.',
              'Cultural differences can affect the recruiting strategy.'
            ]
          }
        },
        {
          projectKey: 'p2',
          title: 'Describe clearly the recruitment process.',
          hint: 'A description of the motivation for the participants to participate is mandatory. For instance, it should be stated whether the participants were paid and if so, how much, or whether they earned educational credits for taking part in the experiment [Jedlitschka 2008].',
          considerations: {
            state: 'Consider whether the recruitment process is specified in terms of:',
            items: [
              'Who to recruit, including eligibility criteria for participants.',
              'Dates defining the periods for recruitment.',
              'How many participants will be recruited.',
              'Descriptions of the study participants in terms of, for example, SE experience, type (student, practitioner, consultant), nationality, task experience and other relevant variables.',
              'What knowledge/experience the participants need to know to be able to do the experimental tasks.',
              'The motivation for the participants to participate in the study.',
              'If they are voluntary participants, or if they will receive payments, educational credits, or other kind of advantage.'
            ]
          }
        },
        {
          projectKey: 'p3',
          title: 'Describe the demographic questionnaire planned to collect information from participants.',
          hint: 'Surveys and interviews are common ways of collecting and measuring demographic variables. This data can be gathered before or after a task, or even as part of testing a potential participant against inclusion criteria [Ko_2013].',
          considerations: {
            state: 'Consider:',
            items: [
              'The content of demographic questionnaire (that is, questions that describe the participants) is described.',
              'Demographic data are characteristics and attributes of a population, such as age, gender, and other characteristics that are of particular interest to the researcher.',
              'The experimenters describe when the demographic data will be collected.',
              'How the demographic data will be used is described.'
            ]
          }
        },
        {
          projectKey: 'p4',
          title: 'Define the population from which participants are drawn.',
          hint: '',
          considerations: {
            state: 'Consider whether:',
            items: [
              'The experimenters define carefully the population about which he/she are seeking to make inferences from the results of the experiment.'
            ]
          }
        },
        {
          projectKey: 'p5',
          title: 'Describe the sample.',
          hint: 'A more principled way to decide how many participants to recruit is to do a prospective power analysis (e.g., Dybå et al. 2006), which gives an estimate of the sample size required to detect a difference between experimental conditions. The exact calculation of this estimate depends on the specific statistical test used to compare the groups, but it generally requires three inputs: (1) the expected effect size (the difference in the outcome variable between groups), (2) the expected variation in this outcome measurement, and (3) the Type I error rate α (typically .05 in software engineering). The first two must be estimated. One source of these estimates is to use data from previous experiments on the tool or even pilot studies There are also standard approaches for estimating sample size and effect size such as Cohen’s d, odds ratio, and Abelson’s Causal Efficacy Ratio. Breaugh (2003) provides an accessible introduction to these topics [Ko 2015].',
          considerations: {
            state: 'Consider whether the sample is described in terms of:',
            items: [
              'The sample size is justified.',
              'The study has an adequate sample size (one large enough) to detect meaningful effects of the intervention.'
            ]
          }
        },
        {
          projectKey: 'p6',
          title: 'Define clearly the debriefing of participants.',
          hint: 'After a participant has completed the tasks, it is common practice in human subjects research to debrief the participant about the study. Debriefing can also be an opportunity to get speculative feedback from participants about how they felt about the tool. If participants did not use the experimental treatment, it may be instructive for them to try it and provide feedback. Participants should not leave a study feeling as if they “failed,” especially when tasks may have been designed to ensure that not every participant would succeed. Many ethicists feel that is a necessary part of research with human participants [Ko 2015].',
          considerations: {
            state: 'Consider if the experimenters describe how they will [Ko 2015]:',
            items: [
              'Explain to the participant what the study is investigating.',
              'Explain why the study is important to conduct.',
              'Explain how the participant’s data will be used to investigate the question.',
              'Explain the correct solutions to the tasks.',
              'Provide contact information so that the participant can ask further questions if they want to know more about the research.',
              'Provide instructions about information that participants should not share with others. For example, if one is recruiting from a student population, students might share the answers to the tasks with their friends, who may later participate in the study.'
            ]
          }
        }
      ]
    },
    {
      section: 'Experimental Materials and Tasks',
      questions: [
        {
          projectKey: 'emt1',
          title: 'Describe clearly what instruments, materials, technology, and tools will be used and how.',
          hint: 'All experimental materials and equipment should be described. For example, if the study involves a questionnaire, questions should be described, as should any other characteristics of the questionnaire [Jedlitschka 2008].',
          considerations: {
            state: 'Consider how well the experimenters have described:',
            items: [
              'Which objects are selected and why.',
              'Experimental materials, raw data, programs, artifacts, specifications, code, whatever they need for running the experiment itself.',
              'Technology information to reproduce the experiment.',
              'Description of any tools that need to be purchased and any training required. Instructions must be written out or recorded properly.',
              'Forms and questionnaires for the participants to fill out, interview materials.',
              'All characteristics of the experimental material that might have an impact on the results.',
              'Experimental infrastructure that will be used by participants during the data collection, such as how many computers they will need and for how long.'
            ]
          }
        },
        {
          projectKey: 'emt2',
          title: 'Describe in detail the tasks that will be performed by the participants.',
          hint: '',
          considerations: {
            state: 'Consider whether the following are fully described:',
            items: [
              'The tasks to be performed by subjects.',
              'The scope of the tasks.',
              'The feature coverage of the new technology the tasks will exploit.',
              'If the experiment will be performed in a physical or virtual location.',
              'The origin of the tasks.',
              'The task duration. E.g.: unlimited time to work on a task (allowing either the participant or the experimenter to decide when the task is complete) or a time limit.',
              'Task difficulty.',
              'Number of tasks needed for the experiment.',
              'The information the participants will receive before they start the tasks.',
              'How much training the participants will receive to be able to use the new technology.',
              'The rationale behind the selection of roles, artefacts, viewpoints, etc.',
              'Whether the description includes precisely what happens to the participants from the moment they arrive to the moment they leave.',
              'The procedures to prevent or minimize any potential risk or discomfort. For example, fatigue during the experiment, cultural differences, language.',
              'If the experiment is a replication, the discussion of the adjustments and their rationales.'
            ]
          }
        },
        {
          projectKey: 'emt3',
          title: 'Define success with respect to the experimental tasks and how success will be measured.',
          hint: '',
          considerations: {
            state: 'Consider whether the following are described adequately:',
            items: [
              'The goal state that a participant must reach to be counted as successful.',
              'A method for determining when a goal state has been reached.',
              'A method of communicating the goal to participants that all participants will interpret similarly.'
            ]
          }
        }
      ]
    },
    {
      section: 'Experimental Design',
      questions: [
        {
          projectKey: 'ed1',
          title: 'Describe the most appropriate experiment design for your experiment.',
          hint: 'The choice of design should involve consideration of sample size (number of replicates), selection of a suitable run order for the experimental trials, and determination of whether or not blocking or other randomization restrictions are involved [Montgomery 2013]. For the description of the experimental design in the experimental plan, it is important that not only the final design of the experiment is in there, but it should have also an explanation of how the design was arrived at and why experimenters have chosen that design and not a different one.',
          considerations: {
            state: 'Consider:',
            items: [
              'If the research design is appropriate to address the aims of the research.',
              'General Design Principles: randomization, blocking, and balancing.',
              'If the experiment design is the most appropriate for the variables involved.',
              'If there is a justification for why the experimenters have chosen their experimental design.'
            ]
          }
        },
        {
          projectKey: 'ed2',
          title: 'Define the treatments for your experiment.',
          hint: '',
          considerations: {
            state: 'Consider:',
            items: [
              'Whether the experimental treatments have been defined sufficiently precisely for them to be applied correctly by the experimenter or by those wishing to repeat the experiment.',
              'How realistic the treatments are.',
              'Alternatives or levels and treatment definitions.',
              'Whether the experiment is a within – or between-subjects design, or a mixed factors design, with a description of each of the levels of the independent variables.',
              'Whether there is a control group with which to compare treatments?',
              'Whether all treatment groups (including any control groups) are planned to be treated equivalently during the preparation for and conduct of the experiment'
            ]
          }
        },
        {
          projectKey: 'ed3',
          title: 'Define the process which you will apply the treatment to objects and subjects (e.g. randomization).',
          hint: 'Experimenters have to think through how they will assign subjects to tasks and treatments, and in what order.',
          considerations: {
            state: 'Consider whether:',
            items: [
              'Treatments are randomly allocated.',
              'Participants are appropriately allocated to treatments given the number of participants and the overall experimental design.',
              'All measures for randomization are described, especially the random allocation of participants to treatments.',
              'The number of relationships among subjects, objects and variables is carefully described in the experimental plan.'
            ]
          }
        },
        {
          projectKey: 'ed4',
          title: 'Describe the appropriate blinding procedure (e.g. blind allocation of materials, blind marking).',
          hint: '',
          considerations: {
            state: 'Consider whether:',
            items: [
              'Lack of blinding could introduce bias.',
              'Investigators will be kept ‘blind’ to participants exposure to the intervention.',
              'Investigators will be kept ‘blind’ to other important confounding and prognostic factors.',
              'The study participants will be aware of the research question.',
              'For any kind of blinding (e.g., blind allocation), the details are provided.'
            ]
          }
        }
      ]
    },
    {
      section: 'Procedure',
      questions: [
        {
          projectKey: 'pcd1',
          title: 'Describe an adequate description of the context in which the experiment will be carried out.',
          hint: '',
          considerations: {
            state: 'Consider whether:',
            items: [
              'Where the experiment should be executed is described.',
              'The environment (location) of the experiment is representative for the study\'s objectives.'
            ]
          }
        },
        {
          projectKey: 'pcd2',
          title: 'Describe the training that will be provided.',
          hint: 'The study should provide a way to teach the concepts and skills quickly and effectively and devise a way to ensure that the participants have successfully learned the material [Ko 2015].',
          considerations: {
            state: 'Consider:',
            items: [
              'The description of training provided to the participants.',
              'Whether experimenters will provide training on how to use the new technology.',
              'Terminology of the new technology.',
              'The design of the programs they will work with during tasks.',
              'The decision of what to teach and what to have participants learn during the tasks.'
            ]
          }
        },
        {
          projectKey: 'pcd3',
          title: 'Define the process which you will apply the treatment to objects and subjects (e.g. randomization).',
          hint: 'Experimenters have to think through how they will assign subjects to tasks and treatments, and in what order.',
          considerations: {
            state: 'Consider whether:',
            items: [
              'Treatments are randomly allocated.',
              'Participants are appropriately allocated to treatments given the number of participants and the overall experimental design.',
              'All measures for randomization are described, especially the random allocation of participants to treatments.',
              'The number of relationships among subjects, objects and variables is carefully described in the experimental plan.'
            ]
          }
        },
        {
          projectKey: 'pcd4',
          title: 'Describe the Pilot.',
          hint: 'Designing a study with human participants is necessarily an iterative process. Running an experiment for the first time, like testing software for the first time, will reveal a range of problems, which might include confusing study materials, bugs in the tool, confusion about the tasks, and unanticipated choices made by participants. Sandbox pilots and analytical evaluation are good options of pre-pilots because they are easy to schedule and can reveal problems with the experiment without the trouble of recruiting outsiders. Ko (2015) brings interesting tips about pilot and pre-pilots [Ko 2015]. If possible, a pilot of the experiment on a small set of people may be useful, so that you are sure that the plan is complete and the instructions understandable [Pfleeger 1995].',
          considerations: {
            state: '',
            items: []
          }
        },
        {
          projectKey: 'pcd5',
          title: 'Describe the schedule in which the experiment will be run.',
          hint: '',
          considerations: {
            state: 'Consider',
            items: [
              'How many hours/ days the experiment will be run.',
              'How experimenters have organized these days.',
              'Which activities experimenters will cover each day.',
              'The schedule for the experiment, and how long the experiment will take on each day.',
              'What events will happen during the experiments, in what order, and with what timing.',
              'How many times the experiment will be repeated.'
            ]
          }
        }
      ]
    },
    {
      section: 'Data Collection and Data Analysis',
      questions: [
        {
          projectKey: 'dcda1',
          title: 'Describe the data collection procedures.',
          hint: 'Details of the data collection method have to be described, including when the data will be collected, by whom, and with what kind of support (e.g., tool). Any type of transformation of the data (e.g., marking “true” defects in defect lists) and training provided for such should also be described [Jedlitschka 2008].',
          considerations: {
            state: 'Consider whether:',
            items: [
              'The data collection is planned in a way that addresses the research issue.',
              'The data collection methods are adequately described.',
              'The data collection procedures are sufficient for the purpose (data sources, collection, storage, validation)?',
              'Any quality control method that will be used to ensure completeness and accuracy of data collection.'
            ]
          }
        },
        {
          projectKey: 'dcda2',
          title: 'Describe clearly the analysis procedures.',
          hint: '',
          considerations: {
            state: 'Consider:',
            items: [
              'How experimenters are going to analyze the data they will obtain.',
              'The description of the analysis procedure detailing which methods will be used to test the hypotheses in analyzing the data.',
              'The types of analysis.'
            ]
          }
        },
        {
          projectKey: 'dcda3',
          title: 'Describe the statistical methods.',
          hint: '',
          considerations: {
            state: 'Consider:',
            items: [
              'The statistical context and methods applied.',
              'Whether the statistical methods are appropriate for the study design.',
              'The rationale and justification for the statistical methods.',
              'If the results were not analyzed statistically, whether statistical analysis could have provided additional descriptive and analytical insight.',
              'Whether references are cited for all statistical procedures used.'
            ]
          }
        },
        {
          projectKey: 'dcda4',
          title: 'Describe precisely the estimate of the treatment effect.',
          hint: '',
          considerations: {
            state: 'Consider:',
            items: [
              'How experimenters will interpret the possible outcomes of the experiment.',
              'The confidence limits.',
              'Whether potential confounders are adequately controlled for in the analysis.',
              'How it is ensured that the data do not violate the assumptions of the tests used on them.'
            ]
          }
        }
      ]
    },
    {
      section: 'Threats to Validity',
      questions: [
        {
          projectKey: 'tv1',
          title: 'Identify and discuss threats to validity, study limitations, potential biases or confounders that may influence the experiment results.',
          hint: 'A fundamental question concerning results from an experiment is how valid the results are. It is important to consider the question of validity already in the planning phase in order to plan for adequate validity of the experiment results. Adequate validity refers to that the results should be valid for the population of interest. [Wohlin 2012]. [Anderlin Neto and Conte 2014] presents a tool to assist inexperienced researchers in identifying and addressing threats to validity in the planning stages of controlled experiments in software engineering',
          considerations: {
            state: 'Consider:',
            items: [
              'Whether mention is made of the threats to validity in the experimental plan and also how these threats can affect the results and findings.',
              'Whether the experimenters discuss the limitations of their study.',
              'Whether the experimenters discuss potential experiment bias.',
              'Whether the experimenters report the rationale of their decisions in terms of how the balanced different threats to validity.'
            ]
          }
        }
      ]
    },
    {
      section: 'Document',
      questions: [
        {
          projectKey: 'd1',
          title: 'About the Experimental Plan.',
          hint: 'Instead of targeting a perfect study, it would be better if researchers just started running studies even if they are not perfect, or even if they are simpler. The basic problem in doing experimentation in software engineering today is because everybody sees experiments as very difficult to run, and currently, researchers who are reviewing studies want the studies to be perfect. It is important that we think less about whether the study is methodologically perfect, and more about what we have really learned by running the study even if it has limitations, and even if there are questions about external validity in terms of the generalization of the results. If researchers were able to run more studies, especially smaller ones, it would be a big step for our field because there is so much we do not know. There more studies we can run, the more opportunities we have to learn more about software engineering experiments',
          considerations: {
            state: 'Consider whether:',
            items: [
              'The experimental plan is suitable for its audience, easy to read and well structured.',
              'The terms are defined in such a way that it is possible to replicate the study.',
              'The experiment addresses a clearly focused issue.'
            ]
          }
        }
      ]
    }
  ]
}
