
<template>
    <div class="h_pd10" style="padding-bottom: 10px;">
        <el-row>
            <el-col :span="5">
                <type-list></type-list>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light">
                    <tree-list></tree-list>
                </div>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    import TypeList  from './ruleClass.type'
    import TreeList  from './ruleClass.tree'

    export default {
        components: {
            TypeList,TreeList
        }
    };
</script>