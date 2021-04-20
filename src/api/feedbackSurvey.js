import apiUtils from './apiUtils'

let url = apiUtils.baseUrl

class feedbackSurveyAPI {
  postFeedbackSurvey = (auth_token, user_id, data) => {
    return apiUtils.post(url + '/surveys/save_survey')
  }
}