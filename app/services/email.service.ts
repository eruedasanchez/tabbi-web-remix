import { constantsENV } from "~/config/constants"
import BaseService from "./utils/BaseService"

const emailService = new BaseService(constantsENV.ENDPOINT.email)

export default emailService
