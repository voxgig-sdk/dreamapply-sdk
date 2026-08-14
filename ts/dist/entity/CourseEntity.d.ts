import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { Course, CourseLoadMatch, CourseListMatch, CourseCreateData } from '../DreamapplyTypes';
declare class CourseEntity extends DreamapplyEntityBase<Course> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: CourseEntity): CourseEntity;
    load(this: any, reqmatch?: CourseLoadMatch, ctrl?: Control): Promise<CourseEntity>;
    list(this: any, reqmatch?: CourseListMatch, ctrl?: Control): Promise<CourseEntity[]>;
    create(this: any, reqdata?: CourseCreateData, ctrl?: Control): Promise<CourseEntity>;
}
export { CourseEntity };
